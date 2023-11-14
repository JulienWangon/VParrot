<?php

require_once './vparrot-server/models/Schedules.php';
require_once './vparrot-server/repository/SchedulesRepository.php';
require_once './vparrot-server/Validator/Validator.php';

class SchedulesController {

    private $validator;
    private $schedulesRepository;

    public function __construct(SchedulesRepository $schedulesRepository, Validator $validator) {
        $this->validator = $validator;
        $this->schedulesRepository = $schedulesRepository;
    }


    //Setting Response
    private function sendResponse($data, $statusCode = 200) {

      header("Content-Type: application/json");
      http_response_code($statusCode);
      echo json_encode($data);

    }

    //Get all schedules list
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
    public function updateSchedule($idSchedules) {

        // Retrieve data sent by the client
        $data = json_decode(file_get_contents('php://input'), true);

        //Validate json data format
        if (!$this->validator->validateJsonFormat($data)) {

            $this->sendResponse($this->validator->getErrors(), 400);
            return;
        }

        $requireKeys =["day_of_week", "morning_opening", "morning_closing", "afternoon_opening", "afternoon_closing"];
            foreach ($requireKeys as $key) {
                if (!isset($data[$key])) {

                    $this->sendResponse(["status" => "error", "message" => "La clé $key est manquante."], 400);
                    return;
                }
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

        //If id not exists
        if(!$this->schedulesRepository->idExists($idSchedules)) {

            $this->sendResponse([
                "status" => "error",
                "message" => "L'id du jour n'existe pas."
            ], 400);

            return;
        }

        //Update Schedules
        try {

            $result = $this->schedulesRepository->UpdateSchedule($idSchedules, [
                "morning_opening" => $data["morning_opening"],
                "morning_closing" => $data["morning_closing"],
                "afternoon_opening" => $data["afternoon_opening"],
                "afternoon_closing" => $data["afternoon_closing"]
            ]);

            if ($result) {

                $this->sendResponse([
                    "status" => "success",
                    "message" => "Horaires mises à jour avec succès."
                ]);
            } else {

                $this->sendResponse([
                    "status" => "error",
                    "message" => "Aucune mise à jour éffectuée."
                ], 400);
            }
        } catch (Exception $e) {

            $this->sendResponse([
                "status" => "error",
                "message" => $e->getMessage()
            ], 500);
        }
    }
}