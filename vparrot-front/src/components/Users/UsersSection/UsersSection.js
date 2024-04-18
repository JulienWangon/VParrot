import React, { useState, useEffect } from 'react';
import useFetchAllUsers from '../hooks/useFetchAllUsers';
import useFetchAllRoles from '../hooks/useFetchAllRoles';
import useDeleteUser from '../hooks/useDeleteUser';
import UserCard from '../UserCard/UserCard';
import Button from '../../common/Buttons/Button/Button';
import UserModal from '../UserModal/UserModal';

import './userSection.css';
import H2Title from '../../common/H2Title/H2Title';

const UsersSection = () => {

    const { users: initialUsers, isLoading: isLoadingUsers } = useFetchAllUsers();
    const { roles, isLoading: isLoadingRoles } = useFetchAllRoles();
    const { deletedUser } = useDeleteUser();

    const [users, setUsers] = useState(initialUsers);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {

      setUsers(initialUsers);
    }, [initialUsers]);


    const handleCreateUserClick = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };


    const handleEditUserClick = (user) => {
      setSelectedUser(user);
      setIsModalOpen(true);
    };

   
    const addUser = (newUser) => {

      setUsers(prevUsers => [...prevUsers, newUser]);
    };


    const updateUser = (updatedUser) => {
    
      setUsers(prevUsers => {
       
        return prevUsers.map(user => user.idUser === updatedUser.idUser ? updatedUser : user);
      });
    };


    const handleDeleteUser = (userId, userName) => {
      if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ?`)) {
          deletedUser(userId)
              .then(() => {
                  setUsers(prevUsers => prevUsers.filter(user => user.idUser !== userId));   
             
              })
              .catch(error => {
               
              });
      }
  };


    if (isLoadingUsers || isLoadingRoles) { 
      return <div>Loading...</div>;
    }
  
  return (
    <section className="mt-4">
        <H2Title className="userSectionTitle" h2Text="Gestion des comptes utilisateur"/>
        <div className="createUserBtnContainer">
            <Button className="createUserBtn" colorStyle="redBtn" onClick={handleCreateUserClick}>Créer un utilisateur</Button>
        </div>
        <div className="userCardContainer row row-cols-1 row-cols-md-2 g-4">
        
            {users.map((user) => (
              <div key={user.idUser} className="userCardList col d-flex align-items-stretch">
                  <UserCard user={user} onEditUser={() => handleEditUserClick(user)} onDeleteUser={() => handleDeleteUser(user.idUser)}/>
              </div>
                
            ))}
        </div>
        {isModalOpen && <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} roles={roles} mode={selectedUser ? "update" : "create"} users={users} onAddUser={addUser} onUpdateUser={updateUser} userToUpdate={selectedUser}/>}
    </section>
  );
};

export default UsersSection;