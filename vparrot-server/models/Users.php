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




}