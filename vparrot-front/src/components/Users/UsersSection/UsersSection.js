import React, { useState } from 'react';
import useFetchAllUsers from '../hooks/useFetchAllUsers';
import useFetchAllRoles from '../hooks/useFetchAllRoles';
import UserCard from '../UserCard/UserCard';
import Button from '../../common/Buttons/Button/Button';
import UserModal from '../UserModal/UserModal';

import './userSection.css';
import H2Title from '../../common/H2Title/H2Title';

const UsersSection = () => {

    const { users: initialUsers, isLoading: isLoadingUsers } = useFetchAllUsers();
    const { roles, isLoading: isLoadingRoles } = useFetchAllRoles();

    const [users, setUsers] = useState(initialUsers);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateUserClick = () => {
      setIsModalOpen(true);
  };

  const addUser = (newUser) => {
   
    setUsers([...users, newUser]);
};

    if(isLoadingUsers) { return <div>Loading...</div>}
    if(isLoadingRoles) { return <div>Loading...</div>}
   
  return (
    <section className="mt-4">
        <H2Title className="userSectionTitle" h2Text="Gestion des comptes utilisateur"/>
        <div className="createUserBtnContainer">
            <Button className="createUserBtn" colorStyle="redBtn" onClick={handleCreateUserClick}>Créer un utilisateur</Button>
        </div>
        <div className="userCardContainer row row-cols-1 row-cols-md-2 g-4">
            {initialUsers.map((user) => (
              <div key={user.idUser} className="userCardList col d-flex align-items-stretch">
                  <UserCard user={user}/>
              </div>
                
            ))}
        </div>
        {isModalOpen && <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} roles={roles} users={users} onAddUser={addUser} />}
    </section>
  );
};

export default UsersSection;