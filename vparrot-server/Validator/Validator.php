<?php

class Validator {

    protected $errors = [];

    //Names Validation
    public function validateStringForNames($input, $type, $maxLength = 50) {

        //Checking if $input exists
        if(!$input || $input === "") {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type est requis."];
            return false;

        //Checking min Length
        }else if (strlen($input) < 3) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type doit comporter au moins 3 caractères."];
            return false;

        //Checking max Length
        }else if (strlen($input) > $maxLength) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type ne doit pads dépasser $maxLength caractères."];
            return false;

        //Checking input format
        }else {
            if(!preg_match("/^[A-Za-z'-]+$/", $input)) {
                $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type peut uniquement contenir des lettres (majuscule et minuscules), des apostrophes et des tirets."];
                return false;
            }
        }

        return empty($this->errors[$type]);
    }

    //Validate testimony's rating 
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

    public function validateMediumContent($content, $type, $minLength = 20, $maxLength = 250){

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

        } else if (!preg_match("/^[A-Za-z0-9 .,!?()-]+$/", $content)) {
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

        //Check if password exists
        if(!$password || $password === ""){
            $this->errors["password"][] = ["status" => "error", "message" => "Le mot de passe est requis"];

        //Check if password have an uppercase letter
        } else if (!preg_match("/[A-Z]/", $password)) {
            $this->errors["password"][] = ["status" => "error", "message" => "Le mot de passe doit contenir au moins une lettre majuscule."];

        //Check if password have lowercase letter    
        } else if (!preg_match("/[a-z]/", $password)) {
            $this->errors["password"][] = ["status" => "error", "message" => "Le mot de passe doit contenir au moins une lettre minuscule."];

        //check if password contains a special charactère    
        } else if (!preg_match("/[\W]/", $password)) {
            $this->errors["password"][] = ["status" => "error", "message" => "Le mot de passe doit contenir au moins un caractère spécial."];
        }

        return empty($this->errors["password"]);

    }

    //Validate hours format
    public function validateHoursFormat ($hourString){

        if(!isset($hourString['morning_opening']) || !isset($hourString['morning_closing']) || !isset($hourString['afternoon_opening']) || !isset($hourString['afternoon_closing'])) {
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

        $morningOpening = DateTime::createFromFormat("H:i:s", $hourString["morning_opening"]);
        $morningClosing = DateTime::createFromFormat("H:i:s", $hourString["morning-_closing"]);
        $afternoonOpening = DateTime::createFromFormat("H:i:s", $hourString["afternoon_opening"]);
        $afternoonclosing = Datetime::createFromFormat("H:i:s", $hourString["afternoon_closing"]);

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

    //Return validator error
    public function getErrors() {
        return $this->errors;
    }

}