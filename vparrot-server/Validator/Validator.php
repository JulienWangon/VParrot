<?php

class Validator {

    protected $errors = [];

    //Names Validation
    public function validateStringForNames($input, $type, $maxLength = 50) {

        //Checking if $input exists
        if(!$input || $input = "") {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type est requis."];
            return false;

        //Checking minimal Length
        }else if (strlen($input) < 3) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type doit comporter au moins 3 caractères."];
            return false;

        //Checking maximal Length
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


    //Return validator error
    public function getErrors() {
        return $this->errors;
    }








}