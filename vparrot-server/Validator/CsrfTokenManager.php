<?php

require_once './vparrot-server/util/SecurityUtil.php';

trait CsrfTokenManager {

    public function generateCsrfToken() {

        if(!session_id()) {

            session_start();
        }

        $token = SecurityUtil::generateSecuretokn();
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