<?php

require_once './vparrot-server/models/Schedules.php';
require_once './vparrot-server/Validator/Validator.php';

class SchedulesController {

    private $validator;
    private $schedules;

    public function __construct($validator, $schedules) {
        $this->validator = $validator;
        $this->schedules = $schedules;
    }


    //Setting Response
    private function sendResponse($data, $statusCode = 200) {

      header("Content-Type: application/json");
      http_response_code($statusCode);
      echo json_encode($data);

    }

    //Get all schedules list
    public function getSchedulesList() {
        $data= $this->schedules->getAllSchedules();
        $this->sendResponse($data);
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
        if(!$this->schedules->idExists($idSchedules)) {

            $this->sendResponse([
                "status" => "error",
                "message" => "L'id du jour n'existe pas."
            ], 400);

            return;
        }

        //Update Schedules
        try {

            $result = $this->schedules->UpdateSchedule($idSchedules, [
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