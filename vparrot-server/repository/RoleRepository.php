<?php

require_once './vparrot-server/models/Database.php';
require_once './vparrot-server/models/Role.php';


class RoleRepository extends Database {

    public function getAllRole () {

        try {

            $db = $this->getBdd();
            $req = "SELECT * FROM roles";

            $stmt = $db->prepare($req);
            $stmt->execute();
            $rolesData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $roles = [];
            foreach($rolesData as $roleData) {

              $role = new Role(
                  $roleData['role_name'],
                  $roleData['id_role']
                  
              );

              $roles[] = $role;
            }

            return $roles;

        } catch (PDOException $e) {

            $this->handleException($e, "extraction liste des rôles");
        }

    }


}