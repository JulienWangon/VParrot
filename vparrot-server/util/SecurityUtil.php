<?php

class SecurityUtil {

    public static function generateSecuretokn () {

        return bin2hex(random_bytes(32));
    }
}