<?php

require_once './vparrot-server/models/Database.php';
require_once './vparrot-server/models/Contact.php';

class contactRepository extends Database {

    /**
      * Récupère tous les contacts de la base de données.
      *
      * Cette méthode établit une connexion avec la base de données,
      * exécute une requête pour récupérer tous les enregistrements de la table `contact`,
      * et les transforme en un tableau d'objets `Contact`.
      *
      * @return Contact[] Un tableau d'objets Contact, chacun représentant un enregistrement de la table `contact`.
      * @throws PDOException Si une erreur survient lors de l'exécution de la requête.
    */

    public function getAllContact() {

        try {

            $db = $this->getBdd();
            $req = "SELECT * FROM contact";

            $stmt = $db->prepare($req);
            $stmt->execute();
            $contactsData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $contacts = [];
            foreach ($contactsData as $contactData) {

                $contact = new Contact(
                    $contactData['id_contact'] ?? null,
                    $contactData['first_name'],
                    $contactData['last_name'],
                    $contactData['phone'],
                    $contactData['email'],
                    $contactData['contact_subject'],
                    $contactData['content'],
                    $contactData['is_treated']
                );

                $contacts[] = $contact;
            }

            return $contacts;

        } catch (PDOException $e) {

            $this->handleException($e, "extraction de la liste des contacts");
        }
    }
  
}