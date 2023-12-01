<?php

require_once './vparrot-server/models/Role.php';
require_once './vparrot-server/repository/RoleRepository.php';
require_once './vparrot-server/Validator/Validator.php';
require_once './vparrot-server/models/AuthModel.php';


class RoleController {

    private $validator;
    private $roleRepository;
    private $authModel;


    public function __construct(RoleRepository $roleRepository, Validator $validator, AuthModel $authModel) {

        $this->roleRepository = $roleRepository;
        $this->validator = $validator;
        $this->authModel = $authModel;

    }

    //formattage de la réponse JSON
    private function sendResponse($data, $statusCode = 200) {

      header("Content-Type: application/json");
      http_response_code($statusCode);
      echo json_encode($data);
    }

    //Obtenir la liste des roles disponible
    public function getAllRolesList() {
        try {

            $roles = $this->roleRepository->getAllRole();

            if(empty($roles)) {
              $this->sendResponse(['status' => 'error', 'message' => 'Aucun role trouvé.']);
              return;
            }

            $rolesArray = array_map(function ($role) {
                return [
                    'idRole' => $role->getIdRole(),
                    'roleName' => $role->getRoleName()
                ];
            }, $roles);

            $this->sendResponse(['status' => 'success', 'data' => $rolesArray]);

        } catch (Exception $e) {

          $this->sendResponse(['error' => $e->getMessage()], 400);
        }
    }




}
