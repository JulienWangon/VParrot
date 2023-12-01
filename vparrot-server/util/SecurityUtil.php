<?php

class SecurityUtil {

    public static function generateSecuretoken () {

        return bin2hex(random_bytes(32));
    }

    //Fonction pour générer un password aléatoire et provisoir pour le nouvel utilisateur
    function generateTemporaryPassword() {
        $length = 8;
        $uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $lowercase = 'abcdefghijklmnopqrstuvwxyz';
        $digits = '0123456789';
        $specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
        $password = '';
    
        // Au moins une majuscule
        $password .= $uppercase[rand(0, strlen($uppercase) - 1)];
    
        // Au moins une minuscule
        $password .= $lowercase[rand(0, strlen($lowercase) - 1)];
    
        // Au moins un chiffre
        $password .= $digits[rand(0, strlen($digits) - 1)];
    
        // Au moins un caractère spécial
        $password .= $specialChars[rand(0, strlen($specialChars) - 1)];
    
        // Remplir le reste du mot de passe avec des caractères aléatoires
        $remainingLength = $length - strlen($password);
        $allChars = $uppercase . $lowercase . $digits . $specialChars;
        for ($i = 0; $i < $remainingLength; $i++) {
            $password .= $allChars[rand(0, strlen($allChars) - 1)];
        }
    
        // Mélanger les caractères du mot de passe
        $password = str_shuffle($password);
    
        return $password;
    }
    


}