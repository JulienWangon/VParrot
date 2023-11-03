import React, { createContext, useContext, useState, useEffect } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({children}) => {

    const[message, setMessage] = useState(null);
    const [type, setType] = useState(null);
    
    const showMessage = (newMessage, newType="error") => {

        setMessage(newMessage);
        setType(newType);       
    };

    // Utilisation de useEffect pour gérer le comportement du message après qu'il soit défini
    useEffect(() => {
        // Déclaration d'une variable pour l'ID du timer
        let timeoutId; 

        // Si un message est défini, on définit un timer pour le cacher après un délai
        if (message) {
            timeoutId = setTimeout(() => {
                // Réinitialiser le message et le type lorsqu'il est effacé
                setMessage(null);
                setType(null);
            }, 1000);
        }       
  // Fonction de nettoyage pour effacer le timer lors du démontage du composant ou avant la définition d'un nouveau message
        return () => clearTimeout(timeoutId);
    }, [message]); // Dépendance à l'état 'message' pour activer useEffect lorsqu'il change

    return (
        <MessageContext.Provider value={{ message, type, showMessage}}>
            {children}
    {/* Si un message est présent, affichez le composant de notification */}
            {message && <MessageNotification message={message} type={type}/>}
        </MessageContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte du message dans d'autres composants
export const useMessage = () => {

    const context = useContext(MessageContext);

// S'assurer que ce Hook est utilisé dans un composant enfant du fournisseur de contexte
    if(!context) {
      throw new Error("useMessage must be used within a MessageProvider"); 
    }
    return context;
};

// Composant de notification qui sera affiché lorsque 'message' n'est pas null
const MessageNotification = ({ message, type}) => {

  // Définir une couleur de fond en fonction du type de message
      const backgroundColor = type === "error" ? "rgba(187, 39, 26, 0.7)" : type === "success" ? "green" : "orange";
      
  // Rendu de la notification
      return (
          <div style={{ position: 'fixed', width: '100%', top: 0, right: 0, background: backgroundColor, color: 'white', padding: '10px', zIndex: "4000" }}>
              {message}
          </div>
      );
  };