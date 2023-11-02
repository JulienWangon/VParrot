<?php

require_once './Database.php';
require_once './vparrot-server/vendor/autoload.php';

  use Firebase\JWT\JWT;
use JetBrains\PhpStorm\ExpectedValues;

  class AuthModel extends Database {

      private const TOKEN_EXPIRY_SECONDS = 7200;

      //Get user by Email 
      public function getUserByEmail($userEmail) {

          try {
              
              $db = $this->getBdd();
              $req = "SELECT users.id_user, roles.role_name
                      FROM users
                      LEFT JOIN roles
                      ON users.role_id = roles.id_role
                      WHERE user_email = :email";
              $stmt = $db->prepare($req);
              $stmt->bindValue(':email', $userEmail, PDO::PARAM_STR);
              $stmt->execute();
              $user = $stmt->fetch(PDO::FETCH_ASSOC);

              if(!$user) {
                  return null;
              }

              return [
                  "id_user" => $user["id_user"],
                  "role_name" => $user["role_name"]
              ];

          } catch(PDOException $e) {

              $this->handleException($e, "recherche de l'utilisateur");
          }

      }

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

          return JWT::encode($payload, $secretKey, "HS256");
      }






  }

  