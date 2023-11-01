<?php

class Validator {

    protected $errors = [];

    //Names Validation
    public function validateStringForNames($input, $type, $maxLength = 50) {

        //Checking if $input exists
        if(!$input || $input = "") {
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
        if(!$rating || $rating = "") {
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
        if (!$content || $content = "") {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type est requis."];
            return false;

        //Checking content min length
        } else if (strlen($content) < $minLength) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type doit comporter au moins $minLength caractères."];
            return false;

        //Checking content max length
        } else if (strlen($content) > $maxLength) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type ne doit pads dépasser $maxLength caractères."];
            return false;

        } else if (!preg_match("/^[A-Za-z0-9 .,!?()-]+$/", $content)) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ commentaire contient des caractères non autorisés."];
            return false;
        }

        return empty($this->errors[$type]);
    }

    //Validate Email
    public function validateEmail($email) {

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->errors["email"][] = ["status" => "error", "message" => "L'adresse e-mail n'est pas valide."];
            return false;
        }

        return empty($this->errors["email"]);
    }

    
    //Return validator error
    public function getErrors() {
        return $this->errors;
    }

}