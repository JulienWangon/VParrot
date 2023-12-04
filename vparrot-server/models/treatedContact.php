<?php


class treatedContact {

    private $idTreatedContact;
    private $firstName;
    private $lastName;
    private $phone;
    private $email;
    private $subject;
    private $content;
    private $status;
    private $treatmentDate;
    private $userComment;
    private $assignedUserId;


    public function __construct ($idTreatedContact = null, $firstName = null, $lastName = null, $phone = null, $email = null, $subject = null, $content = null, $assignedUserId = null, $treatmentDate = null, $userComment = null , $status = "en cours") {

        $this->idTreatedContact = $idTreatedContact;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->phone = $phone;
        $this->email = $email;
        $this->subject = $subject;
        $this->content = $content;
        $this->status = $status;
        $this->treatmentDate = $treatmentDate;
        $this->userComment = $userComment;
        $this->assignedUserId = $assignedUserId;

    } 

    //Liste des Getters
    public function getIdTreatedContact() :int {
        return $this->idTreatedContact;
    }

    public function getFirstName() :string {
        return $this->firstName;
    }

    public function getLastName() :string {
        return $this->lastName;
    }

    public function getPhone() :string {
        return $this->phone;
    }

    public function getEmail() :string {
        return $this->email;
    }

    public function getSubject() :string {
        return $this->subject;
    }

    public function getContent() :string {
        return $this->content;
    }

    public function getStatus() :string {
        return $this->status;
    }

    public function getTreatmentDate() :string {
        return $this->treatmentDate;
    }

    public function getUserComment() :string {
        return $this->userComment;
    }

    public function getAssignedUserId() :int {
        return $this->assignedUserId;
    }

    //Liste des Setters
    public function setIdTreatedContact($idTreatedContact) :void {
        $this->idTreatedContact = $idTreatedContact;
    }

    public function setFirstName($firstName) :void {
        $this->firstName = $firstName;
    }

    public function setLastName($lastName) :void {
        $this->lastName = $lastName;
    }

    public function setPhone($phone) :void {
        $this->phone = $phone;
    }

    public function setEmail($email) :void {
        $this->email = $email;
    }

    public function setSubject($subject) :void {
        $this->subject = $subject;
    }

    public function setContent($content) :void {
        $this->content = $content;
    }

    public function setStatus($status) :void {
        $this->status = $status;
    }

    public function setTreatmentDate($treatmentDate) :void {
        $this->treatmentDate = $treatmentDate;
    }

    public function setUserComment($userComment) :void {
        $this->userComment = $userComment;
    }

    public function setAssignedUserId($assignedUserId) :void {
        $this->assignedUserId = $assignedUserId;
    }
}