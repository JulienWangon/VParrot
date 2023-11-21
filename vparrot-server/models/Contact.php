<?php

class Contact {

    private $id;
    private $firstName;
    private $lastName;
    private $phone;
    private $email;
    private $subject;
    private $content;
    private $isTreated;

    public function __construct($id = null, $firstName = null, $lastName = null, $phone = null, $email = null, $subject = null, $content = null, $isTreated = 0) {

        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->phone = $phone;
        $this->email = $email;
        $this->subject = $subject;
        $this->content = $content;
        $this->isTreated = $isTreated;
    }

//Getters List 
    public function getId () :int {
        return $this->id;
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

    public function getIsTreated () :bool {
        return $this->isTreated;
    }

//Setters List 
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

    public function setIsTreated($isTreated) :void {
        $this->isTreated = $isTreated;
    }
}