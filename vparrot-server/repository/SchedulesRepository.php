<?php

require_once './vparrot-server/models/Database.php';
require_once './vparrot-server/models/Schedules.php';

class SchedulesRepository extends Database {

    //GET all Schedules
    public function getAllSchedules() : array {
      try {

          $db = $this->getBdd();
          $req = "SELECT * FROM schedules";
          $stmt = $db->prepare($req);
          $stmt->execute();
          $schedulesData = $stmt->fetchALL(PDO::FETCH_ASSOC);
     
          $schedules = [];
          foreach ($schedulesData as $scheduleData) {

              $schedule = new Schedules(    
                  $scheduleData['day_of_week'],
                  $scheduleData['morning_opening'],
                  $scheduleData['morning_closing'],
                  $scheduleData['afternoon_opening'],
                  $scheduleData['afternoon_closing'],
                  $scheduleData['id_opening_day'] ?? null
              );

              $schedules[] = $schedule;     
          }

          return $schedules;

      } catch(PDOException $e) {

          $this->handleException($e, "extraction liste des horaires d'ouverture");
      }
  }


}