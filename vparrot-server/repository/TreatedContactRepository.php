<?php

require_once './vparrot-server/models/TreatedContact.php';
require_once './vparrot-server/models/Database.php';


class TreatedContactRepository extends Database {



  public function getAllTreatedContact() {

      try {

          $db = $this->getBdd();
          $req = "SELECT * FROM treated_contact";

          $stmt = $db->prepare($req);
          $stmt->execute();
          $treatedContactsData = $stmt->fetchAll(PDO::FETCH_ASSOC);

          $treatedContacts = [];
          foreach($treatedContactsData as $treatedContactData) {

              $treatedContact = new TreatedContact(
                $treatedContactData['id_treated_contact'],
                $treatedContactData['first_name'],
                $treatedContactData['last_name'],
                $treatedContactData['phone'],
                $treatedContactData['email'],
                $treatedContactData['contact_subject'],
                $treatedContactData['content'],
                $treatedContactData['assigned_user_id'],
                $treatedContactData['treatment_date'],
                $treatedContactData['user_comment'],
                $treatedContactData['status']    
              );

              $treatedContacts[] = $treatedContact;

          }

          return $treatedContacts;

      } catch (PDOException $e) {

          $this->handleException($e, "extraction de tous les avis clients");
      }

  }

}