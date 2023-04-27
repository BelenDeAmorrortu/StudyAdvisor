import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

export default function Alert(currentTheme, message, icon, btnConfirmText, btnDenyText, confirmFunction, denyFunction, closeFunction){
    Swal.fire({
        text: message,
        icon: icon,
        iconColor: '#85C7DE',
        showCloseButton: true,
        showDenyButton: btnDenyText ? true : false,
        confirmButtonText: btnConfirmText,
        denyButtonText: btnDenyText,
        allowEnterKey: false,
        customClass: {
            popup: `Alert ${currentTheme}`,
            closeButton: 'closeButton',
            confirmButton: 'confirmButton',
            denyButton: 'denyButton',
        }
    })
    .then( result =>{

        if(confirmFunction && result.isConfirmed) confirmFunction()

        else if(denyFunction && result.isDenied) denyFunction()

        else if(closeFunction && result.dismiss) closeFunction()
    })
}
