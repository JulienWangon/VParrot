import React, { createContext, useContext, useState, useEffect } from "react";
import instanceAxios from "../_utils/axios";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./MessagesContext";

//Création d'un context avec une valeur vide par défaut
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);

  //State pour stocker l'utilisateur actuel
      const [currentUser, setCurrentUser] = useState(null);
 
      const navigate = useNavigate();

      const { showMessage } = useMessage();

  // check if user is connect
    const checkUserSession = async () => {

        try {
            const response = await instanceAxios.get('/check-session', {  withCredentials: true});

            if (response.status === 200) {
                setCurrentUser({
                  id: response.data.user.id,
                  role: response.data.user.role
                });
          
            }
        } catch (error) {
        
            setCurrentUser(null);
        } 
        setLoading(false);
    }

    // Utiliser l'effet pour vérifier la session une fois que le composant AuthProvider est monté
  useEffect(() => {
    checkUserSession();
  }, []);
  
  //Méthode e connexion de l'utilisateur    
      const login = async (email, password, captchaToken) => {
          try {
  //Configurer les données du formulaire pour la requête POST
            const data = {
              user_email: email,
              user_password: password,
              captchaToken: captchaToken
            };
  //Envoyer la requête POST pour la connexion
            const response = await instanceAxios.post('/login', JSON.stringify(data), {
  
              headers: {
                'Content-Type' : 'application/json'
              },
              withCredentials: true
            });
  
      
  //Vérifier la réponse si la connexion est réussi mettre à jour l' utilisateur actuel
            if(response.data.status === "success") {
              showMessage(response, "success");             
              setCurrentUser({
                id: response.data.user.id,
                role: response.data.user.role
              }); 
                                 
                navigate('/accueiladmin');
            } else if (response.data.status === "error") {
              // Utilisateur non trouvé ou authentification échouée
              throw new Error(response.data.message || "Erreur de connexion");
              
            }
          } catch (error) {
      // En cas d'erreur réseau ou de problème avec la requête, stockez un message d'erreur.
      if (error.response && error.response.status === 401) {
          showMessage(error.response.data.message, "error");
        } else {
          showMessage("Une erreur s'est produite lors de la connexion.", "error");
        }
          } 
      };
  
  
  //Méthode pour déconnecter l'utilisateur
      const logout = async () => {
          try {

  //envoyer une requête POST pour déconnecter l'utilisateur
              const response = await instanceAxios.post('/logout', {}, {
                  withCredentials: true,
              });
  
  //Vérifier la réponse si la déconnexion est réussie, reinitialiser l'utilisateur actuel
              if(response.data.status === 'success') {
                  setCurrentUser(null);
                  showMessage(response, "success");
                  navigate('/access-panel');
              } else {             
  //Si la réponse indique un échec, stockez le message d'erreur.
                  showMessage(response.data.message, "error");
              }
          } catch (error) {
             
              if (error.response && error.response.data) {
                  // Si l'erreur a une réponse et que les données de réponse sont disponibles, utilisez le message d'erreur de l'API
                  showMessage(error.response.data.message, "error");
              } else {
                  // Si ce n'est pas une erreur API (comme un problème réseau), utilisez un message d'erreur générique
                  showMessage("Une erreur s'est produite lors de la connexion.");
              }
  
          }
      };
  
  
      const clearErrors = () => {
          showMessage(null);
        };
  //Liste des valeurs disponibles dans le contexte pour les composants enfants
      const contextValue = {
        currentUser,
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

