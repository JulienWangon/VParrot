<?php

require_once 'Database.php';
require_once './vparrot-server/vendor/autoload.php';

  use Firebase\JWT\JWT;


  class AuthModel extends Database {

      private const TOKEN_EXPIRY_SECONDS = 7200;

      //Create JWT token for user
      public function createJWTForUser($user) {
          //Take secret key 
          $secretKey = $_ENV['SECRET_KEY'];

          if(!$secretKey) {
            throw new Exception("clé secrète introuvable");
          }

          $issueAt = time();
          $expiryTime = $issueAt + self::TOKEN_EXPIRY_SECONDS;

          $payload = [
              "iat" => $issueAt,
              "exp" => $expiryTime,
              "id_user" => $user["id_user"],
              "role_name" => $user["role_name"],
          ];

          $jwt = JWT::encode($payload, $secretKey, "HS256");

          $jwtData = ["jwt" => $jwt, "exp" => $expiryTime];
          return $jwtData;
      }

  }

  