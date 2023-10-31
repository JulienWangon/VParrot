<?php

require_once './vparrot-server/models/Testimonies.php';


class TestimoniesController {

    private function sendResponse($data, $statusCode = 200) {

        header("Content-Type: application/json");
        http_response_code($statusCode);
        echo json_encode($data);
    }

//GET all testimonies list
    public function getAllTestimoniesList() {
        $testimonies = new Testimonies();
        $data = $testimonies->getAllTestimonies();
        $this->sendResponse($data);
    }




}