<?php

require_once 'Database.php';

class Schedules extends Database {

    private ?int $idOpeningDay = null;
    private ?string $dayOfWeek;
    private ?string $morningOpening;
    private ?string $morningClosing;
    private ?string $afternoonOpening;
    private ?string $afternoonClosing;

    public function __construct( ?string $dayOfWeek = null, ?string $morningOpening = null, ?string $morningClosing = null, ?string $afternoonOpening = null, ?string $afternoonClosing = null, ?int $idOpeningDay = null) {
        
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
    public function setIdOpeningDay($idOpeningDay) {
        $this->idOpeningDay = $idOpeningDay;
    }

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
   
}