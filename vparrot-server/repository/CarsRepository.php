<?php

require_once './vparrot-server/models/Database.php';

class CarsRepository extends Database {

    /**
     * Récupère les détails sommaires de chaque voiture disponible.
     *
     * Cette méthode interroge la base de données pour extraire des informations de base sur chaque voiture,
     * y compris l'identifiant de la voiture, la marque, le modèle, le nom commercial, le prix, ainsi que diverses
     * caractéristiques comme l'année, le type de carburant, la puissance, le kilométrage, la transmission, le type de carrosserie,
     * et le chemin d'accès à l'image principale de la voiture. La méthode utilise une jointure entre les tables 'cars',
     * 'car_features' et 'cars_images' pour collecter ces informations.
     *
     * @return array Renvoie un tableau de tableaux associatifs, chacun représentant les détails sommaires d'une voiture.
     *               Chaque tableau contient les informations de base et les caractéristiques de la voiture.
     *               Renvoie un tableau vide si aucune voiture n'est trouvée.
     * @throws PDOException Si une erreur survient lors de l'exécution de la requête à la base de données.
     */

    public function carBriefDetails() :array {

        try {

            $db = $this->getBdd();

            $req= "SELECT c.id_car, c.brand, c.model, c.trade_name, c.price, cf.years, cf.fuel, cf.power, cf.kilometer, cf.transmission, cf.body, ci.file_path AS image
                    FROM cars c
                    JOIN car_features cf ON c.id_car = cf.car_id
                    LEFT JOIN cars_images ci ON c.id_car = ci.car_id AND ci.is_main = 1";

            $stmt = $db->prepare($req);
            $stmt->execute();
            $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);

             return $cars;

        } catch(PDOException $e) {

            $this->handleException($e, "extraction des informations de base des véhicules");
        }
    }

    /**
     * Récupère les détails complets d'une voiture spécifique en utilisant son identifiant.
     *
     * Cette méthode interroge la base de données pour extraire toutes les informations concernant une voiture spécifique,
     * identifiée par son identifiant $carId. Elle récupère des détails tels que les caractéristiques de la voiture, 
     * les images associées, et les équipements. La méthode utilise des jointures entre plusieurs tables
     * (comme 'cars', 'car_features', 'cars_images', 'car_equipments', 'equipments' et 'equipment_types')
     * et des fonctions d'agrégation pour regrouper les images et les équipements en une seule entrée par voiture.
     *
     * @param int $carId L'identifiant de la voiture dont les détails sont à récupérer.
     * @return array|null Renvoie un tableau associatif contenant les détails de la voiture si elle est trouvée.
     *                    Renvoie null si aucune voiture n'est trouvée avec l'identifiant spécifié.
     * @throws PDOException Si une erreur survient lors de l'exécution de la requête à la base de données.
    */

    // Get all car details by car id 
    public function getCarDetailsById($carId) {

        try {

            $db = $this->getBdd();
            
            $db->exec("SET SESSION group_concat_max_len = 1000000");

        $req = "SELECT
                    c.*,
                    cf.years, cf.fuel, cf.power, cf.kilometer, cf.transmission, cf.body,
                    GROUP_CONCAT(ci.file_path SEPARATOR '; ') AS images,
                    GROUP_CONCAT(CONCAT(et.type_name, ':', e.denomination) SEPARATOR '; ') AS equipments
                FROM cars c
                LEFT JOIN car_features cf ON c.id_car = cf.car_id
                LEFT JOIN cars_images ci ON c.id_car = ci.car_id
                LEFT JOIN car_equipments ce ON c.id_car = ce.car_id
                LEFT JOIN equipments e ON ce.equipment_id = e.id_equipment
                LEFT JOIN equipment_types et ON e.type_id = et.id_type
                WHERE c.id_car = :carId
                GROUP BY c.id_car";

                    $stmt = $db->prepare($req);
                    $stmt->bindValue(":carId", $carId, PDO::PARAM_INT);
                    $stmt->execute();
                    $carDetails = $stmt->fetch(PDO::FETCH_ASSOC);

                    return $carDetails;

        } catch (PDOException $e) {

            $this->handleException($e, "extraction des détails d'un véhicule");
        }
    }

    /**
     * Vérifie si une voiture spécifique existe dans la base de données en fonction de son identifiant.
     *
     * Cette méthode interroge la table 'cars' pour déterminer si une voiture avec l'identifiant spécifié ($carId) existe.
     * Elle utilise une requête de comptage pour obtenir le nombre d'occurrences de cet identifiant dans la table.
     * La méthode renvoie un booléen indiquant si la voiture existe (true si au moins un enregistrement correspondant est trouvé).
     *
     * @param int $carId L'identifiant de la voiture à vérifier.
     * @return bool Renvoie vrai (true) si une voiture avec l'identifiant spécifié existe dans la base de données.
     *              Renvoie faux (false) si aucune voiture correspondante n'est trouvée.
     * @throws PDOException Si une erreur survient lors de l'exécution de la requête à la base de données.
    */

    public function checkCarExists($carId) {
        try {

            $db = $this->getBdd();

            $req = "SELECT COUNT(*) FROM cars WHERE id_car = :carId";
            $stmt = $db->prepare($req);
            $stmt->bindValue(":carId", $carId, PDO::PARAM_INT);
            $stmt->execute();
            $count = $stmt->fetchColumn();

            return $count > 0;

        } catch (PDOException $e ) {

            $this->handleException($e, "vérification existance d'une voiture");
        }
    }

     /**
     * Récupère une liste de voitures filtrées en fonction des critères spécifiés.
     *
     * Cette méthode construit une requête SQL dynamique basée sur les filtres fournis en paramètre.
     * Les filtres peuvent inclure la marque, le modèle, le type de carburant, la transmission, l'année minimale
     * et le kilométrage maximal. La méthode utilise des jointures LEFT JOIN pour récupérer les caractéristiques
     * et l'image principale de chaque voiture. Elle renvoie un tableau de voitures correspondant aux critères spécifiés.
     *
     * @param array $filters Tableau associatif contenant les critères de filtrage. Les clés possibles incluent
     *                       'brand', 'model', 'fuel', 'transmission', 'yearMin', 'kmMax'.
     * @return array Renvoie un tableau de tableaux associatifs, chacun représentant une voiture correspondant
     *               aux critères de filtrage. Chaque tableau contient des informations détaillées sur la voiture.
     *               Renvoie un tableau vide si aucun véhicule correspondant n'est trouvé.
     * @throws PDOException Si une erreur survient lors de l'exécution de la requête à la base de données.
    */

    public function getFilteredCars($filters) {

        try {

            $db = $this->getBdd();

            $req = "SELECT cars.*, car_features.*, cars_images.file_path AS image
                    FROM cars
                    LEFT JOIN car_features ON cars.id_car = car_features.car_id
                    LEFT JOIN cars_images ON cars.id_car = cars_images.car_id AND cars_images.is_main = 1
                    WHERE 1=1";

            if(!empty($filters['brand'])) {
                $req .= " AND cars.brand = :brand";
            }

            if(!empty($filters['model'])) {
                $req .= " AND cars.model = :model";
            }

            if(!empty($filters['fuel'])) {
                $req .= " AND car_features.fuel = :fuel";
            }

            if(!empty($filters['transmission'])) {
                $req .= " AND car_features.transmission = :transmission";
            }

            if(!empty($filters['yearMin'])) {
                $req .= " AND car_features.years >= :yearMin";
            }

            if(!empty($filters['kmMax'])) {
                $req .= " AND car_features.kilometer <= :kmMax";
            }

            $stmt = $db->prepare($req);


            if(!empty($filters['brand'])) {
                $stmt->bindValue(":brand", $filters['brand'], PDO::PARAM_STR);
            }

            if(!empty($filters['model'])) {
                $stmt->bindValue(":model", $filters['model'], PDO::PARAM_STR);
            }

            if(!empty($filters['fuel'])) {
                $stmt->bindValue(":fuel", $filters['fuel'], PDO::PARAM_STR);
            }

            if(!empty($filters['transmission'])) {
                $stmt->bindValue(":transmission", $filters['transmission'], PDO::PARAM_STR);
            }

            if(!empty($filters['yearMin'])) {
                $stmt->bindValue(":yearMin", $filters['yearMin'], PDO::PARAM_INT);
            }

            if(!empty($filters['kmMax'])) {
                $stmt->bindValue(":kmMax", $filters['kmMax'], PDO::PARAM_INT);
            }

            $stmt->execute();
            $filteredCars = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $filteredCars;

        } catch (PDOException $e) {

            $this->handleException($e, "extraction des véhicules filtrés");
        }
    }


    /**
     * Récupère une liste de marques de voitures distinctes de la base de données.
     *
     * Cette méthode interroge la table 'cars' pour extraire toutes les marques de voitures distinctes.
     * Elle est utilisée pour générer une liste de marques disponibles, par exemple, pour les options de filtrage
     * ou pour afficher une liste déroulante dans l'interface utilisateur.
     *
     * @return array Renvoie un tableau de tableaux associatifs, chacun contenant une marque de voiture unique.
     *               Chaque tableau associatif contient une clé 'brand' avec la marque correspondante.
     *               Renvoie un tableau vide si aucune marque distincte n'est trouvée.
     * @throws PDOException Si une erreur survient lors de l'exécution de la requête à la base de données.
    */
   
    public function getDistinctBrands () {

        try {

            $db = $this->getBdd();

            $req = "SELECT DISTINCT brand FROM cars";
            $stmt = $db->prepare($req);
            $stmt->execute();
            $brands = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $brands;
            
        } catch (PDOException $e) {

            $this->handleException($e, "extraction des marques distinctes");
        }
    }

    /**
     * Récupère une liste de modèles de voitures distincts de la base de données.
     *
     * Cette méthode interroge la table 'cars' pour extraire tous les modèles de voitures distincts.
     * Elle est utile pour générer une liste de modèles disponibles, souvent utilisée pour les options de filtrage
     * ou pour afficher une liste déroulante dans l'interface utilisateur. Chaque modèle distinct est récupéré
     * sans doublons pour faciliter la sélection ou la recherche parmi les différents modèles de voitures.
     *
     * @return array Renvoie un tableau de tableaux associatifs, chacun contenant un modèle de voiture unique.
     *               Chaque tableau associatif contient une clé 'model' avec le modèle correspondant.
     *               Renvoie un tableau vide si aucun modèle distinct n'est trouvé.
     * @throws PDOException Si une erreur survient lors de l'exécution de la requête à la base de données.
    */

    public function getDistinctmModels () {

        try {

            $db = $this->getBdd();

            $req = "SELECT DISTINCT model FROM cars";
            $stmt = $db->prepare($req);
            $stmt->execute();
            $models = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $models;
            
        } catch (PDOException $e) {

            $this->handleException($e, "extraction des marques distincts");
        }
    }


    /**
     * Récupère une liste de types de carburants distincts des caractéristiques des voitures.
     *
     * Cette méthode interroge la table 'car_features' pour extraire tous les types de carburants distincts.
     * Elle est utile pour générer une liste des différents types de carburants disponibles, ce qui peut être
     * utilisé pour des options de filtrage dans l'interface utilisateur ou pour d'autres fonctionnalités liées
     * à la classification des voitures par type de carburant.
     *
     * @return array Renvoie un tableau de tableaux associatifs, chacun contenant un type de carburant unique.
     *               Chaque tableau associatif contient une clé 'fuel' avec le type de carburant correspondant.
     *               Renvoie un tableau vide si aucun type de carburant distinct n'est trouvé.
     * @throws PDOException Si une erreur survient lors de l'exécution de la requête à la base de données.
    */

    public function getDistinctFuelTypes () {

        try {

            $db = $this->getBdd();

            $req = "SELECT DISTINCT fuel FROM car_features";
            $stmt = $db->prepare($req);
            $stmt->execute();
            $fuleTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $fuleTypes;
       
        } catch (PDOException$e) {

            $this->handleException($e, "extraction des carburants distincts");
        }
    }

    /**
     * Récupère une liste de types de transmission distincts des caractéristiques des voitures.
     *
     * Cette méthode interroge la table 'car_features' pour extraire tous les types de transmission distincts.
     * Elle est utilisée pour générer une liste des différents types de transmission disponibles, ce qui peut être
     * utilisé pour des options de filtrage dans l'interface utilisateur ou pour d'autres fonctionnalités liées
     * à la classification des voitures par type de transmission.
     *
     * @return array Renvoie un tableau de tableaux associatifs, chacun contenant un type de transmission unique.
     *               Chaque tableau associatif contient une clé 'transmission' avec le type de transmission correspondant.
     *               Renvoie un tableau vide si aucun type de transmission distinct n'est trouvé.
     * @throws PDOException Si une erreur survient lors de l'exécution de la requête à la base de données.
    */

    public function getDistinctTransmissions () {

        try {

            $db = $this->getBdd();

            $req = "SELECT DISTINCT transmission FROM car_features";
            $stmt = $db->prepare($req);
            $stmt->execute();
            $fuleTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $fuleTypes;
       
        } catch (PDOException$e) {

            $this->handleException($e, "extraction des transmissions distinctes");
        }
    }
}