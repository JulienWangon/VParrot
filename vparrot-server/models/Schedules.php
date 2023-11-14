<?php

require_once 'Database.php';

class Schedules extends Database {

    private ?int $idOpeningDay = null;
    private string $dayOfWeek;
    private string $morningOpening;
    private string $morningClosing;
    private string $afternoonOpening;
    private string $afternoonClosing;

    public function __construct( string $dayOfWeek, string $morningOpening, string $morningClosing, string $afternoonOpening, string $afternoonClosing, ?int $idOpeningDay = null) {
        
        $this->idOpeningDay = $idOpeningDay;
        $this->dayOfWeek = $dayOfWeek;
        $this->morningOpening = $morningOpening;
        $this->morningClosing = $morningClosing;
        $this->afternoonOpening = $afternoonOpening;
        $this->afternoonClosing = $afternoonClosing;
    }

//Getters List
    public function getIdOpeningDay() : ?int {
        return $this->idOpeningDay;
    }

    public function getDayOfWeek() : string {
        return $this->dayOfWeek;
    }

    public function getMorningOpening() : string {
        return $this->morningOpening;
    }

    public function getMorningClosing() : string {
        return $this->morningClosing;
    }

    public function getAfternoonOpening() : string {
        return $this->afternoonOpening;
    }

    public function getAfternoonClosing() : string {
        return $this->afternoonClosing;
    }

//Setters List
    public function setDayOfWeek($dayOfWeek) :void {
        $this->dayOfWeek = $dayOfWeek;
    }

    public function setMorningOpening($morningOpening) :void {
        $this->morningOpening = $morningOpening;
    }

    public function setMorningClosing($morningClosing) :void {
        $this->morningClosing = $morningClosing;
    }

    public function setAfternoonOpening($afternoonOpening) : void {
        $this->afternoonOpening = $afternoonOpening;
    }

    public function setAfternoonClosing($afternoonClosing) :void {
        $this->afternoonClosing = $afternoonClosing;
    }

//CRUD Methods



//UPDATE Schedule
    public function UpdateHours($idOpeningDay, $newValues) : bool {

        try {

            $columnTable = [];
            foreach($newValues as $key =>$value) {
                $columnTable[] = "$key = :$key";
            }

            $columnTable = implode(", ", $columnTable);

            $db = $this->getBdd();
            $req = "UPDATE schedules SET " . $columnTable . " WHERE id_opening_day = :idOpeningDay";
            $stmt = $db->prepare($req);

            $stmt->bindValue(":idOpeningDay", $idOpeningDay, PDO::PARAM_INT);

            foreach($newValues as $key => $value) {
                $stmt->bindValue(":$key" , $value);
            }

            $stmt->execute();

            return $stmt->rowCount() > 0;

        } catch(PDOException $e) {

            $this->handleException($e, "mise à jour des horaires d'ouverture");
        }
    }

    //If id exists method
    public function idExists($idOpeningDay) {
      try {

          $db= $this->getBdd();
          $req = "SELECT * FROM schedules WHERE id_opening_day = :idOpeningDay";
          $stmt = $db->prepare($req);
          $stmt->bindValue(":idOpeningDay", $idOpeningDay, PDO::PARAM_INT);
          $stmt->execute();

          $count = $stmt->fetchColumn();

          return $count >0;

      } catch (PDOException $e) {

          $this->handleException($e, "vérification si l'id du jour d'ouverture existe");
      }
  }



    
}