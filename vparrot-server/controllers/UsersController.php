<?php

require_once './vparrot-server/models/Users.php';
require_once './vparrot-server/Validator/Validator.php';

class UsersController {

    private $validator;

    //Setting Response
    private function sendResponse($data, $statusCode = 200) {

      header("Content-Type: application/json");
      http_response_code($statusCode);
      echo json_encode($data);

    }

    //Get all users list
    public function getAllUsersList() {
        $users = new Users();
        $data = $users->getAllUsers();
        $this->sendResponse($data);
    }






}