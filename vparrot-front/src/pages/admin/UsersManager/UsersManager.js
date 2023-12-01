import React from 'react';
import Header from '../../../components/common/Header/Header';
import UsersSection from '../../../components/Users/UsersSection/UsersSection';

const UsersManager = () => {
  return (
    <>
        <Header title="Utilisateurs" slogan="Gestion des utilisateurs"/>

        <main>

          <UsersSection/>


        </main>
    </>
  );
};

export default UsersManager;