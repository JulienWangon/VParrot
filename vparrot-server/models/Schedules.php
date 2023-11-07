<?php

require_once 'Database.php';

class Schedules extends Database {

    private ?int $idOpeningDay = null;
    private ?string $dayOfWeek = null;
    private ?string $morningOpening = null;
    private ?string $morningClosing = null;
    private ?string $afternoonOpening = null;
    private ?string $afternoonClosing = null;

    public function __construct(?string $dayOfWeek = null, ?string $morningOpening = null, ?string $morningClosing = null, ?string $afternoonOpening = null, ?string $afternoonClosing = null, ?int $idOpeningDay = null ) {
          
        $this->dayOfWeek = $dayOfWeek;
        $this->morningOpening = $morningOpening;
        $this->morningClosing = $morningClosing;
        $this->afternoonOpening = $afternoonOpening;
        $this->afternoonClosing = $afternoonClosing;
    }

//Getters List
    public function getIdOpeningDay() : int {
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

//GET all Schedules
    public function getAllOpeningDays() : array {
        try {

            $db = $this->getBdd();
            $req = "SELECT * FROM opening_days";
            $stmt = $db->prepare($req);
            $stmt->execute();
            $openingDays = $stmt->fetchALL(PDO::FETCH_ASSOC);
       
            return $openingDays;

        } catch(PDOException $e) {

            $this->handleException($e, "extraction liste utilisateur");
        }
    }

//UPDATE Schedule
    public function UpdateHours($idOpeningDay, $newValues) : bool {

        try {

            $columnTable = [];
            foreach($newValues as $key =>$value) {
                $columnTable[] = "$key = :$key";
            }

            $columnTable = implode(", ", $columnTable);

            $db = $this->getBdd();
            $req = "UPDATE opening_days SET " . $columnTable . " WHERE idOpeningDay = :idOpeningDay";
            $stmt = $db->prepare($req);

            $stmt->bindValue(":idOpeningDay", $idOpeningDay, PDO::PARAM_INT);

            foreach($newValues as $key => $value) {
                $stmt->bindValue(":$key" , $value);
            }

            $stmt->execute();

            return $stmt->rowCount() > 0;

        } catch(PDOException $e) {

            $this->handleException($e, "extraction liste utilisateur");
        }
    }

    //If id exists method
    public function idExists($idOpeningDay) {
      try {
        
          $db= $this->getBdd();
          $req = "SELECT * FROM opening_days WHERE idOpeningDay = :idOpeningDay";
          $stmt = $db->prepare($req);
          $stmt->bindValue(":idOpeningDay", $idOpeningDay, PDO::PARAM_INT);
          $stmt->execute();

          $count = $stmt->fetchColumn();

          return $count >0;

      } catch (PDOException $e) {

          $this->handleException($e, "extraction liste utilisateur");
      }
  }



    
}