import Swal from "sweetalert2";

export function successAlert(msg: string) {
    Swal.fire({
        position: 'top-end',
        title: msg,
        showConfirmButton: false,
        timer: 1500,
        width: 400,
        heightAuto: false,
       
        padding : 15    
    },);
}

export function errorAlert(msg: string) {
    Swal.fire({
        position: 'top-end',
        // icon: 'error',
        title: msg,
        showConfirmButton: false,
        timer: 1500,
        background: '#dc3545',
        width: 400,
        heightAuto: true,
        padding : 15,    
        
    });
}