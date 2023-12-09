<?php

require_once './vparrot-server/models/TreatedContact.php';
require_once './vparrot-server/models/Contact.php';

require_once './vparrot-server/models/Database.php';


class TreatedContactRepository extends Database {

    private $contactRepo;

    public function __construct(ContactRepository $contactRepo) {

        $this->contactRepo = $contactRepo;
    }


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


  public function contactTreatment ($contactId, $assignedUserId, $userComment, $treatmentDate, $newStatus) {

      $db = $this->getBdd();

      try {

          $contact = $this->contactRepo->getContactById($contactId);

          $req = "INSERT INTO treated_contact (first_name, last_name, phone, email, contact_subject, content, status, treatment_date, user_comment, assigned_user_id) VALUES (:firstName, :lastName, :phone, :email, :subject, :content, :status, :treatmentDate, :userComment, :assignedUserId)";

          $stmt = $db->prepare($req);
          $stmt->bindValue(":firstName", $contact->getFirstName(), PDO::PARAM_STR);
          $stmt->bindValue(":lastName", $contact->getLastName(), PDO::PARAM_STR);
          $stmt->bindValue(":phone", $contact->getPhone(), PDO::PARAM_STR);
          $stmt->bindValue(":email", $contact->getEmail(), PDO::PARAM_STR);
          $stmt->bindValue(":subject", $contact->getSubject(), PDO::PARAM_STR);
          $stmt->bindValue(":content", $contact->getContent(), PDO::PARAM_STR);
          $stmt->bindValue(":status", $newStatus, PDO::PARAM_STR);
          $stmt->bindValue(":treatmentDate", $treatmentDate, PDO::PARAM_STR);
          $stmt->bindValue(":userComment", $userComment, PDO::PARAM_STR);
          $stmt->bindValue(":assignedUserId", $assignedUserId, PDO::PARAM_INT);

          $stmt->execute();

          $this->contactRepo->deletecontactById($contactId);

          $db->commit();
           
      } catch (PDOException $e) {

          $db->rollBack();
          $this->handleException($e, "traitement du contact");
      } catch (Exception $e) {

          $db->rollBack();
          throw $e;
      }
  }

}