<?php

require_once './vparrot-server/models/Schedules.php';
require_once './vparrot-server/repository/SchedulesRepository.php';
require_once './vparrot-server/Validator/Validator.php';
require_once './vparrot-server/models/AuthModel.php';

class SchedulesController {

    private $validator;
    private $schedulesRepository;
    private $authModel;

    public function __construct(SchedulesRepository $schedulesRepository, Validator $validator, AuthModel $authModel) {
        $this->validator = $validator;
        $this->schedulesRepository = $schedulesRepository;
        $this->authModel = $authModel;
    }


    //Paramétrage réponse global 
    private function sendResponse($data, $statusCode = 200) {

      header("Content-Type: application/json");
      http_response_code($statusCode);
      echo json_encode($data);

    }

    //Obtenir la liste des horaires d'ouvertures de la semaine
    public function getSchedulesList() {
        try {

            $schedules = $this->schedulesRepository->getAllSchedules();

            $schedulesArray = array_map(function ($schedule) {
                return [
                    'idOpeningDay' => $schedule->getIdOpeningDay(),
                    'dayOfWeek' => $schedule->getDayOfWeek(),
                    'morningOpening' => $schedule->getMorningOpening(),
                    'morningClosing' => $schedule->getMorningClosing(),
                    'afternoonOpening' => $schedule->getAfternoonOpening(),
                    'afternoonClosing' => $schedule->getAfternoonClosing()    
                ];
            }, $schedules);

            $this->sendResponse(['status' => 'success', 'data' => $schedulesArray]);
         
        } catch (Exception $e) {

            $this->sendResponse(['error' => $e->getMessage()], 400);
        }
               
    }

    //Update Schedules
    public function updateSchedule($idOpeningDay) {

        // Récupérer les données transmise par le client
        $data = json_decode(file_get_contents('php://input'), true);

        //Validation format json
        if (!$this->validator->validateJsonFormat($data)) {

            $this->sendResponse($this->validator->getErrors(), 400);
            return;
        }

        $requireKeys =["morningOpening", "morningClosing", "afternoonOpening", "afternoonClosing", "idOpeningDay", "dayOfWeek"];
            foreach ($requireKeys as $key) {
                if (!isset($data[$key])) {

                    $this->sendResponse(["status" => "error", "message" => "La clé $key est manquante."], 400);
                    return;
                }
            }

        //Vérifie la présence des donnée id et token csrf
        if (empty($data['idOpeningDay']) || empty($data['csrfToken'])) {
            
            $this->sendResponse(['status' => 'error', 'message'=> 'identitfiant jour ou token csrf manquant'], 400);
            return;
        }

        //Validation du token csrf 
        $decodedTokenData = $this->authModel->decodeJwtFromCookie();

        if ($data['csrfToken'] !== $decodedTokenData['csrfToken']) {
            
            $this->sendResponse(['status' => 'error', 'message' => 'Token CSRF invalide'], 400);
            return;
        }

        $captchaToken = $data['recaptchaResponse'];

        // Vérifier la réponse du CAPTCHA
        if (!$this->validator->verifyGoogleCaptcha($captchaToken)) {
            $this->sendResponse(["status" => "error", "message" => $this->validator->getErrors()], 400);
            return;
        }


        //Data validation
        if(!$this->validator->validateHoursFormat($data)) {

            $this->sendResponse([
                "status" => "error",
                "message" => implode(' ', $this->validator->getErrors())
            ], 400);

            return;
        }

        if(!$this->validator->validateTimeline($data)) {

            $this->sendResponse([
                "status" => "error",
                "message" => implode(' ', $this->validator->getErrors())
            ], 400);

            return;
        }


        //Mise à jour des horaires d'ouverture
        try {

            $schedule = $this->schedulesRepository->getScheduleById($idOpeningDay);

            if (!$schedule) {
                $this->sendResponse(["status" => "error", "message" => "Aucun horaire trouvé pour l'ID spécifié."], 404);
                return;
            }

            $schedule->setMorningOpening($data['morningOpening']);
            $schedule->setMorningClosing($data['morningClosing']);
            $schedule->setAfternoonOpening($data['afternoonOpening']);
            $schedule->setAfternoonClosing($data['afternoonClosing']);
            $schedule->setDayOfWeek($data['dayOfWeek']);
            $schedule->setIdOpeningDay($data['idOpeningDay']);
            

            $result = $this->schedulesRepository->UpdateSchedules($schedule);

            if ($result) {

                $this->sendResponse(["status" => "success", "message" => "Horaires mises à jour avec succès."]);
            } else {

                $this->sendResponse(["status" => "error", "message" => "Aucune mise à jour effectuée."], 400);
            }

            
            } catch (Exception $e) {

                $this->sendResponse(["status" => "error", "message" => $e->getMessage()], 500);
        }
    }
}