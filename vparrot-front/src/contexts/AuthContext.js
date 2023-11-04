import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

//Création d'un context avec une valeur vide par défaut
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);

  //State pour stocker l'utilisateur actuel
      const [currentUser, setCurrentUser] = useState(null);
  //State pour stocker les erreurs de connexion
      const [error, setError] = useState(null);
  
      const navigate = useNavigate();

  // check if user is connect
    const checkUserSession = async () => {

        try {
            const response = await axios.get('http://localhost/vparrot/check-session', {  withCredentials: true});

            if (response.status === 200) {
                setCurrentUser({
                  id: response.data.user.id,
                  role: response.data.user.role
                });
                console.log('Current user updated after session check:', response.data.user);
            }
        } catch (error) {

            
            setCurrentUser(null);
        } 
        setLoading(false);
    }

    // Utiliser l'effet pour vérifier la session une fois que le composant AuthProvider est monté
  useEffect(() => {
    console.log('Checking user session...');
    checkUserSession();
  }, []);
  
  //Méthode e connexion de l'utilisateur    
      const login = async (email, password) => {
          try {
  //Configurer les données du formulaire pour la requête POST
            const data = {
              user_email: email,
              user_password: password
            };
  //Envoyer la requête POST pour la connexion
            const response = await axios.post('http://localhost/vparrot/login', JSON.stringify(data), {
  
              headers: {
                'Content-Type' : 'application/json'
              },
              withCredentials: true
            });
  
            
  //Vérifier la répoonse si la connexion est réussi mettre à jour l' utilisateur actuel
            if(response.status === 200) {
                              
              setCurrentUser({
                id: response.data.user.id,
                role: response.data.user.role
              }); 
              console.log('Current user updated after session check:', response.data.user);           
                navigate('/accueiladmin');
            } else if (response.status === 401) {
              // Utilisateur non trouvé ou authentification échouée
              setError(response.data.message || "Erreur de connexion");
            }
          } catch (error) {
  // En cas d'erreur réseau ou de problème avec la requête, stockez un message d'erreur.
  if (error.response && error.response.status === 401) {
      setError(error.response.data.message || "Erreur de connexion");
    } else {
      setError("Une erreur s'est produite lors de la connexion.");
    }
          } 
      };
  
  
  //Méthode pour déconnecter l'utilisateur
      const logout = async () => {
          try {

  //envoyer une requête POST pour déconnecter l'utilisateur
              const response = await axios.post('http://localhost/vparrot/logout', {}, {
                  withCredentials: true,
              });
  
  //Vérifier la réponse si la déconnexion est réussie, reinitialiser l'utilisateur actuel
              if(response.data.status === 'success') {
                  setCurrentUser(null);
                  console.log('Current user updated after session check:', response.data.user);
                  navigate('/access-panel');
              } else {             
  //Si la réponse indique un échec, stockez le message d'erreur.
                  setError(response.data.message || "Erreur de déconnexion");
              }
          } catch (e) {
             
              if (e.response && e.response.data) {
                  // Si l'erreur a une réponse et que les données de réponse sont disponibles, utilisez le message d'erreur de l'API
                  setError(e.response.data.message || "une erreur s'est produite lors de la connexion.");
              } else {
                  // Si ce n'est pas une erreur API (comme un problème réseau), utilisez un message d'erreur générique
                  setError("une erreur s'est produite lors de la connexion.");
              }
  
          }
      };
  
  
      const clearErrors = () => {
          setError(null);
        };
  //Liste des valeurs disponibles dans le contexte pour les composants enfants
      const contextValue = {
        currentUser,
        error,
        setError,
        login,
        logout,
        loading,
        clearErrors,
      };
  
  //Fournir les valeurs à tous les composants enfants.
      return (
  
          <AuthContext.Provider value={contextValue}>
              {children}
          </AuthContext.Provider>
      );
    };

