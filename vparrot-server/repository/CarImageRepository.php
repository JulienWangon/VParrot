<?php

require_once './vparrot-server/models/Database.php';

class CarImageRepository extends Database {

  public function getCarImagesById($carId) {
    try {
        $db = $this->getBdd();
        // Modification ici pour sélectionner à la fois l'ID et le chemin de l'image
        $req = "SELECT id_images, file_path FROM cars_images WHERE car_id = :carId";

        $stmt = $db->prepare($req);
        $stmt->bindValue(":carId", $carId, PDO::PARAM_INT);
        $stmt->execute();

        // Modification ici pour utiliser FETCH_ASSOC pour renvoyer un tableau associatif
        $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $images;

    } catch (PDOException $e) {
        $this->handleException($e, 'recupération des images de véhicule');
        return []; // Retourne un tableau vide en cas d'erreur
    }
}

public function updateCarImagePaths($imagePaths) {
  try {
      $db = $this->getBdd();
      $db->beginTransaction();

      $sql = "UPDATE cars_images SET file_path = :filePath WHERE id_images = :imageId";
      $stmt = $db->prepare($sql);

      foreach ($imagePaths as $imageId => $filePath) {
          $stmt->bindValue(':filePath', $filePath, PDO::PARAM_STR);
          $stmt->bindValue(':imageId', $imageId, PDO::PARAM_INT);
          $stmt->execute();
      }

      $db->commit();
      return true;
  } catch (PDOException $e) {
      $db->rollBack();
      $this->handleException($e, 'mise à jour des chemins des images de véhicule');
      return false;
  }
}



}
