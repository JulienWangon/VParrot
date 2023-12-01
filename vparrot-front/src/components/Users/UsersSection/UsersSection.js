import React from 'react';
import useFetchAllUsers from '../hooks/useFetchAllUsers';
import UserCard from '../UserCard/UserCard';

const UsersSection = () => {

    const { users, isLoading } = useFetchAllUsers();

    if(isLoading) { return <div>Loading...</div>}

  return (
    <section className="container mt-4">
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {users.map((user) => (
              <div key={user.idUser} className="col d-flex align-items-stretch">
                  <UserCard user={user}/>
              </div>
                
            ))}
        </div>
      
    </section>
  );
};

export default UsersSection;