<?php

require_once 'Database.php';

class Users extends Database {

    private ?int $idUser = null;
    private ?string $firstName = null;
    private ?string $lastName = null;
    private ?string $userEmail = null;
    private ?string $userPassword = null;
    private ?int $roleId = null;

    public function __construct(?string $firstName = null, ?string $lastName = null, ?string $userEmail = null, ?string $userPassword = null, ?string $roleId = null, ?int $idUser = null) {

        $this->idUser = $idUser;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->userEmail = $userEmail;
        $this->userPassword = $userPassword;
        $this->roleId = $roleId;

    }
    
    //Getters list
    public function getIdUser() : int {
        return $this->idUser;
    }

    public function getFirstName() :string {
        return $this->firstName;
    } 

    public function getLastName() :string {
        return $this->lastName;
    }

    public function getUserEmail() :string {
        return $this->userEmail;
    }

    public function getUserPassword() :string {
        return $this->userPassword;
    }

    public function gertRoleId() :int {
        return $this->roleId;
    }

    //Setters list
    public function setFirstName(string $firstName) :void {
        $this->firstName = $firstName;
        
    }

    public function setLastName(string $lastName) :void {
        $this->lastName = $lastName;
    }

    public function setUserEmail(string $userEmail) :void {
        $this->userEmail = $userEmail;
    }

    public function setUserPassword(string $userPassword) :void {
        $this->userPassword = $userPassword;
    }

    public function setRoleId(int $roleId) :void {
        $this->roleId = $roleId;
    }

    





}