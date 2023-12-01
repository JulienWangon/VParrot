<?php

class Validator {

    protected $errors = [];

    //Validation des string courte length 50
    public function validateStringForNames($input, $type, $maxLength = 50) {

        //Vérifie l'existance de la donnée
        if(!$input || $input === "") {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type est requis."];
            return false;

        //Vérification de la longueur minimal
        }else if (strlen($input) < 3) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type doit comporter au moins 3 caractères."];
            return false;

        //Vérification de la longueur maximal
        }else if (strlen($input) > $maxLength) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type ne doit pads dépasser $maxLength caractères."];
            return false;

        //Vérification du format
        }else {
            if(!preg_match("/^[A-Za-z'\s-]+$/", $input)) {
                $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type peut uniquement contenir des lettres (majuscule et minuscules), des apostrophes et des tirets."];
                return false;
            }
        }

        return empty($this->errors[$type]);
    }

    public function validateStringForNamesAndNumbers($input, $type, $maxLength = 50) {
        // Vérification de l'existence de l'entrée
        if(!$input || $input === "") {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type est requis."];
            return false;
        }
    
        // Vérification de la longueur minimale
        if (strlen($input) < 3) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type doit comporter au moins 3 caractères."];
            return false;
        }
    
        // Vérification de la longueur maximale
        if (strlen($input) > $maxLength) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type ne doit pas dépasser $maxLength caractères."];
            return false;
        }
    
        // Vérification du format de l'entrée
        if (!preg_match("/^[A-Za-z0-9'\s-]+$/", $input)) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type peut uniquement contenir des lettres, des chiffres, des espaces, des apostrophes et des tirets."];
            return false;
        }
    
        return empty($this->errors[$type]);
    }



    //Validate pour la note de l avis client  
    public function validateRating($rating) {

        //Checking if rating exists
        if(!$rating || $rating === "") {
            $this->errors['rating'][] = ["status" => "error", "message" => "La note est requise."];
            return false;

        //Checking if rating is a number
        } else if (!is_numeric($rating)){
            $this->errors["rating"][] = ["status" => "error", "message" => "La note doit être un nombre."];
            return false;

        //Checling if rating is between 1 and 5    
        } else if ($rating < 1 || $rating > 5) {
            $this->errors["rating"][] = ["status" => "error", "message" => "La note doit être comprise entre 1 et 5."];
            return false;
        }

        return empty($this->errors['rating']);

    }

    //Validation pour les string medium length 250

    public function validateMediumContent($content, $type, $minLength, $maxLength){

        //Checking if content exists
        if (!$content || $content === "") {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type est requis."];
            return false;

        //Checking content min length
        } else if (strlen($content) < $minLength) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type doit comporter au moins $minLength caractères."];
            return false;

        //Checking content max length
        } else if (strlen($content) > $maxLength) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type ne doit pas dépasser $maxLength caractères."];
            return false;

        } else if (!preg_match("/^[A-Za-z0-9 .,!?()-éèêëàâäôöûüçîïÉÈÊËÀÂÄÔÖÛÜÇÎÏ]+$/", $content)) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ commentaire contient des caractères non autorisés."];
            return false;
        }

        return empty($this->errors[$type]);
    }



    //Validate Email
    public function validateEmail($email) {

        // Check if e-mail exists
        if(!$email || $email == "") {
            $this->errors["email"][] = ["status" => "error", "message" => "L'adresse e-mail est requise."];
            return false;
        }
    
        // Check e-mail format with regex
        $pattern = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
        if(!preg_match($pattern, $email)) {
            $this->errors["email"][] = ["status" => "error", "message" => "L'adresse e-mail n'est pas valide."];
            return false;
        }
    
        return empty($this->errors["email"]);
    }



    //Validate password
    public function validatePassword($password) {

        //Vérifie si le password est présent
        if(!$password || $password === ""){
            $this->errors["password"][] = ["status" => "error", "message" => "Le mot de passe est requis"];

        //Vérifie que le password a au moins une lettre majuscule
        } else if (!preg_match("/[A-Z]/", $password)) {
            $this->errors["password"][] = ["status" => "error", "message" => "Le mot de passe doit contenir au moins une lettre majuscule."];

        //Vérifie que le password a au moins une lettre minuscule    
        } else if (!preg_match("/[a-z]/", $password)) {
            $this->errors["password"][] = ["status" => "error", "message" => "Le mot de passe doit contenir au moins une lettre minuscule."];

        //Vérifie que le password à au moins un caratère spécial
        } else if (!preg_match("/[\W]/", $password)) {
            $this->errors["password"][] = ["status" => "error", "message" => "Le mot de passe doit contenir au moins un caractère spécial."];

        //Vérifie que le password a au moinsun chiffre
        }  else if (!preg_match("/[0-9]/", $password)) {
            $this->errors["password"][] = ["status" => "error", "message" => "Le mot de passe doit contenir au moins un chiffre."];
        }

        return empty($this->errors["password"]);

    }



    //Validate hours format
    public function validateHoursFormat ($hourString){

        if(!isset($hourString['morningOpening']) || !isset($hourString['morningClosing']) || !isset($hourString['afternoonOpening']) || !isset($hourString['afternoonClosing'])) {
            $this->errors[] = "Tous les champs d'horaires sont nécessaires";
            return false;
        }

        //format HH:mm:ss
        $timePattern = "/^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/";
        if (!preg_match($timePattern, $hourString['morningOpening']) || !preg_match($timePattern, $hourString['morningClosing']) || !preg_match($timePattern, $hourString['afternoonOpening']) || !preg_match($timePattern, $hourString['afternoonClosing'])) {
            $this->errors[] = "Le format des horaires est invalide. Utilisez le format HH:mm:ss.";
            return false;
        }

        return true;
    }



    //Timeline validation
    public function validateTimeline($hourString) {

        $morningOpening = DateTime::createFromFormat("H:i:s", $hourString["morningOpening"]);
        $morningClosing = DateTime::createFromFormat("H:i:s", $hourString["morningClosing"]);
        $afternoonOpening = DateTime::createFromFormat("H:i:s", $hourString["afternoonOpening"]);
        $afternoonclosing = Datetime::createFromFormat("H:i:s", $hourString["afternoonClosing"]);

        if($morningOpening >= $morningClosing) {
            $this->errors[] = "L'heure d'ouverture du matin doit être avant l'heure de fermeture du matin";
        }

        if($afternoonOpening >= $afternoonclosing) {
            $this->errors[] = "L'heure d'ouverture de l'aprè-midi doit être avant l'heure de fermeture de l'après-midi";
        }

        if($morningClosing >= $afternoonOpening) {
            $this->errors[] = "L'heure de fermeture du matin doit être avant l'heure d'ouverture de l'après midi";
        }

        return count($this->errors) === 0;
    }



    //Validate JSON data format
    public function validateJsonFormat($jsonData) :bool {

        if ($jsonData === null && json_last_error() !== JSON_ERROR_NONE) {
            $this->errors["json"][] = ["status" => "error", "message" => "Format JSON invalide " . json_last_error_msg()];
            return false;
        }

        return empty($this->errors["json"]);
    }



    //Validate Number 
    public function validateNumber($number, $type, $min = null, $max = null) {
        // Vérifier si le nombre existe
        if (!$number || $number === "") {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type est requis."];
            return false;
        }
    
        // Vérifier si le nombre est réellement un nombre
        if (!is_numeric($number)) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type doit être un nombre."];
            return false;
        }
    
        // Vérifier la limite inférieure, si spécifiée
        if ($min !== null && $number < $min) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type doit être supérieur ou égal à $min."];
            return false;
        }
    
        // Vérifier la limite supérieure, si spécifiée
        if ($max !== null && $number > $max) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type doit être inférieur ou égal à $max."];
            return false;
        }
    
        return empty($this->errors[$type]);
    }



    //Vérifier le token du captcha de Google
    public function verifyGoogleCaptcha($captchaToken) {
        if(empty($captchaToken)) {
            $this->errors['captcha'][] = ['status' => 'error', 'message' => 'Le CAPTCHA est requis.'];
        }

        $googleKey ="6Le8ugwpAAAAAE_wzdBiLe7m7G5z9uA4KqVDd8x4";
        $verifyUrl = "https://www.google.com/recaptcha/api/siteverify?secret=$googleKey&response=$captchaToken";

            try {

                $response = file_get_contents($verifyUrl);
                if ($response === false) {

                    throw new Exception('Échec de la récupération de la réponse du CAPTCHA.');
                }
        
                $responseData = json_decode($response);
                if ($responseData === null) {
                    throw new Exception('Réponse du CAPTCHA mal formée.');
                }
        
                if (!$responseData->success) {
                    $this->errors['captcha'][] = ['status' => 'error', 'message' => 'CAPTCHA invalide.'];
                    return false;
                }
        
                return true;
            } catch (Exception $e) {

                $this->errors['captcha'][] = ['status' => 'error', 'message' => $e->getMessage()];
                return false;
            }
    }


    /**
     * Valide un numéro de téléphone.
     *
     * Cette méthode vérifie si le numéro de téléphone est valide en fonction d'un format spécifique.
     *
     * @param string $phoneNumber Le numéro de téléphone à valider.
     * @param string $type Le type de champ pour l'identification dans les messages d'erreur.
     *
     * @return bool Retourne true si le numéro de téléphone est valide, false sinon.
    */
    public function validatePhoneNumber($phoneNumber, $type) {
        // Vérifier si le numéro de téléphone existe
        if (empty($phoneNumber)) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le numéro de téléphone est requis."];
            return false;
        }

        // Vérifier le format du numéro de téléphone
        if (!preg_match("/^[0-9]{10}$/", $phoneNumber)) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le format du numéro de téléphone est invalide."];
            return false;
        }

        return empty($this->errors[$type]);
    }

    //Retourner les erreurs de validation
    public function getErrors() {
        return $this->errors;
    }

}