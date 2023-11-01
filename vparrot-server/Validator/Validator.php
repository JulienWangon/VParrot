<?php

class Validator {

    protected $errors = [];

    //Names Validation
    public function validateStringForNames($input, $type, $maxLength = 50) {

        //Checking if $input exists
        if(!$input) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type est requis."];

        //Checking minimal Length
        }else if (strlen($input) < 3) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type doit comporter au moins 3 caractères."];

        //Checking maximal Length
        }else if (strlen($input) > $maxLength) {
            $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type ne doit pads dépasser $maxLength caractères."];

        //Checking input format
        }else {
            if(!preg_match("/^[A-Za-z'-]+$/", $input)) {
                $this->errors[$type][] = ["status" => "error", "message" => "Le champ $type peut uniquement contenir des lettres (majuscule et minuscules), des apostrophes et des tirets."];
            }
        }

        return empty($this->errors[$type]);
    }


    //Return validator error
    public function getErrors() {
        return $this->errors;
    }








}