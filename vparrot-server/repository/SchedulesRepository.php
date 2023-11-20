<?php

require_once './vparrot-server/models/Database.php';
require_once './vparrot-server/models/Schedules.php';

class SchedulesRepository extends Database {

    /**
     * Récupère la liste complète des horaires d'ouverture à partir de la base de données.
     *
     * Cette méthode interroge la table 'schedules' pour extraire tous les horaires d'ouverture enregistrés.
     * Chaque enregistrement est transformé en un objet 'Schedules', qui contient les informations détaillées
     * sur les horaires d'ouverture et de fermeture pour chaque jour de la semaine, ainsi que l'identifiant unique
     * de l'horaire.
     *
     * @return array Renvoie un tableau d'objets 'Schedules', chacun représentant un horaire d'ouverture.
     *               Chaque objet 'Schedules' contient les informations de jour, d'ouverture et de fermeture
     *               du matin et de l'après-midi, ainsi que l'identifiant de l'horaire.
     *               Renvoie un tableau vide si aucun horaire n'est trouvé.
     * @throws PDOException Si une erreur survient lors de l'exécution de la requête à la base de données.
    */

    //Obtenir la liste des horaires
    public function getAllSchedules() : array {
      try {

          $db = $this->getBdd();
          $req = "SELECT * FROM schedules";
          $stmt = $db->prepare($req);
          $stmt->execute();
          $schedulesData = $stmt->fetchALL(PDO::FETCH_ASSOC);
     
          $schedules = [];
          foreach ($schedulesData as $scheduleData) {

              $schedule = new Schedules(    
                  $scheduleData['day_of_week'],
                  $scheduleData['morning_opening'],
                  $scheduleData['morning_closing'],
                  $scheduleData['afternoon_opening'],
                  $scheduleData['afternoon_closing'],
                  $scheduleData['id_opening_day']
              );

              $schedules[] = $schedule;     
          }

          return $schedules;

      } catch(PDOException $e) {

          $this->handleException($e, "extraction liste des horaires d'ouverture");
      }
    }



    //Mise a jour des horaires
    public function updateSchedules(Schedules $schedules) : bool {
        try {
            $db = $this->getBdd();
            $columnTable = [
                "morning_opening = :morningOpening",
                "morning_closing = :morningClosing",
                "afternoon_opening = :afternoonOpening",
                "afternoon_closing = :afternoonClosing", 
                "day_of_week = :dayOfWeek",
                "id_opening_day = :idOpeningDay"    
            ];
            
            $req = "UPDATE schedules SET " . implode(", ", $columnTable) . " WHERE id_opening_day = :idOpeningDay";
            $stmt = $db->prepare($req);
    
            // Lier toutes les valeurs, y compris les valeurs nulles
            $stmt->bindValue(":morningOpening", $schedules->getMorningOpening());
            $stmt->bindValue(":morningClosing", $schedules->getMorningClosing());
            $stmt->bindValue(":afternoonOpening", $schedules->getAfternoonOpening());
            $stmt->bindValue(":afternoonClosing", $schedules->getAfternoonClosing());
            $stmt->bindValue(":dayOfWeek", $schedules->getDayOfWeek());
            $stmt->bindValue(":idOpeningDay", $schedules->getIdOpeningDay(), PDO::PARAM_INT);
    
            $stmt->execute();
    
            return $stmt->rowCount() > 0;
    
        } catch(PDOException $e) {
            throw new Exception("Erreur lors de la mise à jour des horaires : " . $e->getMessage());
        }
    }


    //Controlle si une journée existe avec un ID
    public function idExists($idOpeningDay) {
        try {

            $db= $this->getBdd();
            $req = "SELECT * FROM schedules WHERE id_opening_day = :idOpeningDay";
            $stmt = $db->prepare($req);
            $stmt->bindValue(":idOpeningDay", $idOpeningDay, PDO::PARAM_INT);
            $stmt->execute();

            $count = $stmt->fetchColumn();

            return $count >0;

        } catch (PDOException $e) {

            $this->handleException($e, "vérification si l'id du jour d'ouverture existe");
        }
    }


    //Récupérer une journée avec sont id
    public function getScheduleById($idOpeningDay) {
        try {

            $db = $this->getBdd();
            $req = "SELECT * FROM schedules WHERE id_opening_day = :idOpeningDay";

            $stmt = $db->prepare($req);
            $stmt->bindValue(':idOpeningDay', $idOpeningDay, PDO::PARAM_INT);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if(!$result) {

                throw new Exception("Aucun horaire trouvé pour l'ID spécifié");
            }

            $schedule = new Schedules();
            $schedule->setIdOpeningDay($result['id_opening_day']);
            $schedule->setDayOfWeek($result['day_of_week']);
            $schedule->setMorningOpening($result['morning_opening']);
            $schedule->setMorningClosing($result['morning_closing']);
            $schedule->setAfternoonOpening($result['afternoon_opening']);
            $schedule->setAfternoonClosing($result['afternoon_closing']);

            return $schedule;

        } catch(PDOException $e) {

            $this->handleException($e, "vérification si l'id du jour d'ouverture existe"); 
        }


    }

}