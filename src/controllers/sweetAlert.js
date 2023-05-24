// ES6 Modules or TypeScript
import { getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';
import { emailVerification } from './emailVerification';
//import firebaseStart from './firebaseStart';


const customSweetAlert = (title, message, type) => {

    switch (type) {
        case 'error':
            customError(title, message);
            break;

        case 'info':
            customInfo(title, message);
            break;

        case 'success':
            customSuccess(title, message);
            break;

        case 'info-footer':
            customInfoFooter(title, message);
            break;
           
        default:
            break;
    }

}


const customError = (title, message) => {
    let htmlText;

    if (Array.isArray(message)) {
        htmlText = '<ul>';

        for (let i = 0; i < message.length; i++) {
            htmlText += `<li>${message[i]}</li>`
        }
        htmlText += '</ul>'
    }
    else {
        htmlText = `<p>${message}</p>`
    }

    Swal.fire({
        position: 'top',
        icon: 'error',         
        confirmButtonColor: '#116611',
        title: title,
        html: htmlText
    })
}

const customInfo = (title, message) => {
    Swal.fire({
        position: 'top',
        icon: 'info',
        confirmButtonColor: '#116611',       
        title: title,
        html: message

    })

}

const customInfoFooter = (title, message) => {
    Swal.fire({
        position: 'top',
        icon: 'info',
        title: title,
        html: message,
        confirmButtonText: 'Send new email?',
        showCloseButton: true,
        confirmButtonColor: '#116611',
       
    }).then((result)=>{
        if (result.isConfirmed) {          
            const auth = getAuth();
            emailVerification(auth);
        }
    })
}

const customSuccess = (title, message) => {
    Swal.fire({
        position: 'top',
        icon: 'success',        
        confirmButtonColor: '#116611',
        title: title,
        html: message
    })

}





export default customSweetAlert;

