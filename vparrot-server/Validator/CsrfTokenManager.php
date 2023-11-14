<?php

trait CsrfTokenManager {

    public function generateCsrfToken() {

        if(!session_id()) {

            session_start();
        }

        $token = bin2hex(random_bytes(32));
        $_SESSION['csrf_token'] = $token;

        return $token;
    }


    public function validateCsrfToken($token) {

        if(!session_id()) {

            session_start();
        }

        if(isset($_SESSION['csrf_token']) && $_SESSION['csrf_token'] === $token) {

            $this->generateCsrfToken();

            return true;
        }

        return false;
    }
}