<?php

class Contact {

    private $idContact;
    private $firstName;
    private $lastName;
    private $phone;
    private $email;
    private $subject;
    private $content;
    private $status;

    public function __construct($idContact = null, $firstName = null, $lastName = null, $phone = null, $email = null, $subject = null, $content = null, $status = "non traité") {

        $this->idContact = $idContact;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->phone = $phone;
        $this->email = $email;
        $this->subject = $subject;
        $this->content = $content;
        $this->status = $status;
    }

//Getters List 
    public function getIdcontact () :int {
        return $this->idContact;
    }

    public function getFirstName () :string {
        return $this->firstName;
    }

    public function getLastName () :string {
        return $this->lastName;
    }

    public function getPhone () :int {
        return $this->phone;
    }

    public function getEmail () :string {
        return $this->email;
    }

    public function getSubject () :string {
        return $this->subject;
    }

    public function getContent () :string {
        return $this->content;
    }

    public function getStatus () :bool {
        return $this->status;
    }

//Setters List 
    public function setIdContact($idContact) :void {
        $this->idContact = $idContact;
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
}