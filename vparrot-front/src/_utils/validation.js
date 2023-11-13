

//EMAIL VALIDATION
export const validateEmail = (email) => {

  let error = null;

  if (!email) {
    error= "L'adresse e-mail est requise.";
  } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        error = "Veuillez saisir une adresse e-mail valide.";
    }
  }

  return error;
}

//PASSWORD VALIDATION
export const validatePassword = (password) => {

  let error = null;

  if(!password) {
      error = "Le mot de passe est requis";
  } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if(!passwordRegex.test(password)) {
        error = "Le mot de passe doit avoir au moins 8 caractères, inclure au moins une majuscule, un chiffre et un caractère spécial."
      }
  }
  return error;
}

//NAMES VALIDATION
export const validateName =(testName) => {

  let error = null;

  if(!testName) {
      error = "Le nom est requis"
  } else if (testName.length < 3) {
      error = "Le champ doit comporter au moins 3 caractères.";
  } else if (testName.length > 50) {
      error = "Le champ ne doit pas dépasser 50 caractères"
  } else {
      const testRegex = /^[A-Za-z'-]+$/;
      if(!testRegex.test(testName)) {
          error = "Le champ peut uniquement contenir des liettres (majuscules et minuscules), des apostrophes et des tirets";
      }
  }
   return error;
}

export const validateStringWithNumber = (string) => {

    let error = null;

    if(!string) {
        error = "Le champ est requis"
    } else if (string.length < 3) {
        error = "Le champ doit comporter au moins 3 caractères.";
    } else if (string.length > 50) {
        error = "Le champ ne doit pas dépasser 50 caractères"
    } else {
        const testRegex = /^[A-Za-z0-9'-]+$/;
        if(!testRegex.test(string)) {
            error = "Le champ peut uniquement contenir des liettres (majuscules et minuscules), des apostrophes des tirets et des chiffres";
        }
    }
     return error;
}

//RATING VALIDATION
export const validateRating = (rating) => {
  let error = null; 
  if(!rating) {
      error = "La note est requise."
  } else if (isNaN(Number(rating))) {
      error = "La note doit être un nombre."
  } else if (rating < 1 || rating > 5) {
      error = "la note doit être comprise entre 1 et 5."
  }

  return error;
}

// COMMENT VALIDATION
export const validateComment = (comment) => {
  let error =  null;

  const commentRegex = /^[A-Za-z0-9 .,!?()-éèêëàâäôöûüçîïÉÈÊËÀÂÄÔÖÛÜÇÎÏ]+$/;
  const urlRegex = /(www\.|https?:\/\/)[^\s]+?\.[a-zA-Z]{2,}/;

  if(!comment) {
      error = "Le commentaire est requis";
  }else if (comment.length < 20) {
      error = "Le commentaire doit contenir au moins 20 caractères."
  }else if (comment.length > 250) {
      error = "Le commentaire ne doit pas dépasser 250 caractères"
  }else if (!commentRegex.test(comment)) {
      error = "Caractères non autorisés dans le commentaire. Utilisez uniquement des lettres, chiffres, signes de ponctuation courants et parenthèses.";
  }else if (urlRegex.test(comment)) {
      error="Veuillez ne pas inclure d'URLs dans votre commentaire"
  }

  return error;
}

//PHONE NUMBER VALIDATION
export const validatePhoneNumber = (phoneNumber) => {
    let error = null;

    const phoneRegex = /^\+?\d+$/;

    if (!phoneNumber) {
        error = "Le numéro de téléphone est requis.";
    } else {
        if (!phoneRegex.test(phoneNumber)) {
            error = "Veuillez saisir un numéro de téléphone valide.";
        }
    }

    return error;
}





