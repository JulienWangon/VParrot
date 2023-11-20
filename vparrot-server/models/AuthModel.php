<?php

require_once 'Database.php';
require_once './vparrot-server/vendor/autoload.php';
require_once './vparrot-server/util/SecurityUtil.php';

use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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

          $csrfToken = SecurityUtil::generateSecuretoken();

          $payload = [
              "iat" => $issueAt,
              "exp" => $expiryTime,
              "id_user" => $user["id_user"],
              "role" => $user["role_name"],
              "csrf_token" => $csrfToken
          ];

          $jwt = JWT::encode($payload, $secretKey, "HS256");

          $jwtData = ["jwt" => $jwt, "exp" => $expiryTime, "csrf_token" => $csrfToken];
          return $jwtData;
      }


      public function decodeJwtFromCookie () {

          $secretKey = $_ENV['SECRET_KEY'];

          if(!isset($_COOKIE['token'])) {

            throw new Exception("JWT non trouvé dans le cookie");
          }

            try {

              $jwt = $_COOKIE['token'];
              $decoded = JWT::decode($jwt, new Key($secretKey, "HS256"));

              if(!isset($decoded->id_user) || !isset($decoded->role) || !isset($decoded->csrf_token)) {
                error_log("JWT décodé manque des champs requis: " . json_encode($decoded));
                  throw new Exception ("Données JWT incomplètes.");
              }

              return [
                  'idUser' => $decoded->id_user,
                  'role' => $decoded->role,
                  'csrfToken' => $decoded->csrf_token
              ];
          } catch (ExpiredException $e) {

              throw new Exception("JWT expiré");
          } catch (Exception $e) {

              throw new Exception("Erreur lors du décodage du JWT: " . $e->getMessage());
          }
      }



  }

  