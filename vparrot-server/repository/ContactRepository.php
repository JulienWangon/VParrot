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
                    $contactData['status']
                );

                $contacts[] = $contact;
            }

            return $contacts;

        } catch (PDOException $e) {

            $this->handleException($e, "extraction de la liste des contacts");
        }
    }


    /**
     * Ajoute un nouveau contact dans la base de données.
     *
     * Cette méthode prend en paramètre un objet Contact contenant les informations nécessaires
     * pour créer un nouvel enregistrement dans la table contact de la base de données.
     * Elle insère ces informations et définit la colonne is_treated à 0 par défaut.
     *
     * @param Contact $contact Un objet Contact contenant les données du contact à ajouter.
     *
     * @return string Un message indiquant le succès ou l'échec de l'ajout du contact.
     *
     * @throws PDOException Si une erreur survient lors de l'exécution de la requête SQL.
    */

    //Création d'un contact 
    public function addContact (Contact $contact) :string {

        try {

            $db = $this->getBdd();
            $req = "INSERT INTO contact (first_name, last_name, phone, email, contact_subject, content, status) VALUES (:firstName, :lastName, :phone, :email, :contactSubject, :content, 'non traité')";

            $stmt = $db->prepare($req);
            $stmt->bindValue(":firstName", $contact->getFirstName(), PDO::PARAM_STR);
            $stmt->bindValue(":lastName", $contact->getLastName(), PDO::PARAM_STR);
            $stmt->bindValue(":phone", $contact->getPhone(), PDO::PARAM_STR);
            $stmt->bindValue(":email", $contact->getEmail(), PDO::PARAM_STR);
            $stmt->bindValue(":contactSubject", $contact->getSubject(), PDO::PARAM_STR);
            $stmt->bindValue(":content", $contact->getContent(), PDO::PARAM_STR);
            $stmt->execute();

            return "Contact créé avec succès";
           
        } catch (PDOException $e) {

            $this->handleException($e, "ajout d'un contact");
        }
    }


    //Obtenir un contact par son ID
    public function getContactById($idContact) {

        try {

            $db = $this->getBdd();
            $req = "SELECT * FROM contact WHERE id_contact = :idContact";

            $stmt = $db->prepare($req);
            $stmt->bindValue(":idContact", $idContact, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {

                $contactData = $stmt->fetch(PDO::FETCH_ASSOC);

                $contact = new Contact();
                $contact->setIdContact($contactData['id_contact']);
                $contact->setFirstName($contactData['first_name']);
                $contact->setLastName($contactData['last_name']);
                $contact->setPhone($contactData['phone']);
                $contact->setEmail($contactData['email']);
                $contact->setSubject($contactData['subject']);
                $contact->setContent(($contactData['content']));
                $contact->setStatus($contactData['status']);

                return $contact;

            } else {

                throw new Exception("Contact non trouvé.");
            }
        } catch (PDOException $e) {

            $this->handleException($e, "recherche du contact par son id");           
        }
    }


    //Supprimer un contact via son ID
    public function deletecontactById($idContact) {

        try {

            $db = $this->getBdd();
            $req = "DELETE FROM contact WHERE id_contact = :idContact";

            $stmt = $db->preapre($req);
            $stmt->bindValue(":idcontact", $idContact, PDO::PARAM_INT);
            $stmt->execute;

            return $stmt->rowCount() > 0;

        } catch (PDOException $e) {

            $this->handleException($e, "Suppression d'un contact");
        }
    }
  
}