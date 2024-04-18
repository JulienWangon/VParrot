<?php

require_once './vparrot-server/models/Equipment.php';
require_once './vparrot-server/models/EquipmentType.php';
require_once './vparrot-server/repository/EquipmentsRepository.php';
require_once './vparrot-server/repository/EquipmentTypeRepository.php';
require_once './vparrot-server/Validator/Validator.php';
require_once './vparrot-server/models/AuthModel.php';
require_once './vparrot-server/util/ResponseHelper.php';



class EquipmentController {

  private $validator;
  private $equipmentRepository;
  private $equipmentTypeRepository;
  private $authModel;

  public function __construct(EquipmentRepository $equipmentRepository, EquipmentTypeRepository $equipmentTypeRepository ,Validator $validator, AuthModel $authModel) {
    $this->equipmentRepository = $equipmentRepository;
    $this->equipmentTypeRepository = $equipmentTypeRepository;
    $this->validator = $validator;
    $this->authModel = $authModel;
  }

  public function getAllEquipmentsByType() {
    try {

        $equipments = $this->equipmentRepository->getAllEquipments();
        $types = $this->equipmentTypeRepository->getAllTypes();

        // Vérifier si les équipements ou les types sont vides
        if (empty($equipments) || empty($types)) {
            $message = empty($equipments) ? 'Aucun équipement trouvé.' : 'Aucun type d\'équipement trouvé.';
            ResponseHelper::sendResponse(['status' => 'error', 'message' => $message]);
            return;
        }

         // Créer un tableau de correspondance pour les types
         $typeMap = array_column($types, 'type_name', 'id_type');

         // Organiser les équipements par type
         $equipmentByType = [];
         foreach ($equipments as $equipment) {
             $typeName = $typeMap[$equipment->getTypeId()] ?? 'Type Inconnu';
 
             if (!isset($equipmentByType[$typeName])) {
                 $equipmentByType[$typeName] = [];
             }
             $equipmentByType[$typeName][] = [
                 'idEquipment' => $equipment->getIdEquipment(),
                 'denomination' => $equipment->getDenomination(),
                 'typeId' => $equipment->getTypeId(),
                 'typeName' => $typeName
             ];
         }

        ResponseHelper::sendResponse(['status' => 'success', 'data' => $equipmentByType]);

    } catch (Exception $e) {
        ResponseHelper::sendResponse(['error' => $e->getMessage()], 400);
    }
}

public function createNewEquipment() {

    // Vérifier si la requête est de type POST
     if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        ResponseHelper::sendResponse(['status' => 'error', 'message' => 'Méthode non autorisée'], 405);
        return;
    }

    //Vérification des tokens JWT et CSRF
    if(!SecurityUtil::verifyJWTAndCSRF()) {
        return;
    }

     // Sanitization et récupération des données du véhicule
     $data = json_decode(file_get_contents('php://input'), true);
     $denomination = filter_var($data['name'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
     $typeId = filter_var($data['typeId'], FILTER_SANITIZE_NUMBER_INT);

     
     // Validation des données
     $valideDenomination = $this->validator->validateStringForNames($denomination, "nom de l'équipement");
     $valideTypeId = $this->validator->validateNumber($typeId, "id du type d'équipement");

     if (!$valideDenomination || !$valideTypeId){
        $errors = $this->validator->getErrors();
        ResponseHelper::sendResponse(["status" => "error", "message" => $errors], 400);
        return;
    }

    //vérification si le nom de l'équipmeent existe
    if($this->equipmentRepository->EquipmentExists($denomination)) {
        ResponseHelper::sendResponse(['status' => 'error', 'message' => 'Un équipement portant ce nom existe déjà.'], 409);
        return;
    }

    //vérification si le type d'équipement existe
    if(!$this->equipmentTypeRepository->checkEquipmentTypeExists($typeId)) {
        ResponseHelper::sendResponse(['status' => 'error', 'message' => 'Le type d\'équipement spécifié n\'existe pas.'], 404);
        return;
    }

    try {
        $equipment = new Equipment($denomination, $typeId);
        $equipmentId = $this->equipmentRepository->addEquipment($equipment);

        if ($equipmentId) {
            ResponseHelper::sendResponse(['status' => 'success', 'message' => 'Équipement ajouté avec succès.', 'id' => $equipmentId], 200);
        } else {
            throw new Exception('Échec de l\'ajout de l\'équipement.');
        }
    } catch (Exception $e) {
        ResponseHelper::sendResponse(['status' => 'error', 'message' => $e->getMessage()], 500);
    }
}


  
}