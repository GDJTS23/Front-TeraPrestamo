import Swal from 'sweetalert2';

const EmailSafetyModal = () => {
  Swal.fire(
    {icon: 'info',
    title: 'IMPORTANTE',
    text: 'Nunca respondas a correos electrónicos donde te soliciten información personal o de tus cuentas.'}
  )
;
};

export default EmailSafetyModal;
