
/* Hook para validar los fields*/
export function validateField(value, field) {
  let error = ''
  switch(field){
    case 'email':
        if(!value) error = 'Email requerido.'
        else if(!/^([\da-z_.-]+)@([\da-z.-]+)\.([a-z.]{3})$/.test(value)) error = 'El email introducido es invalido.'
        break;
    case 'password':
        if(!value) error = 'Contraseña requerida.'
        else if(!/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]*$/.test(value)) error = 'La contraseña debe contener una minúscula, una mayúscula, un numero y ocho carácteres de largo.'
        break;
    case 'confirm_password':
        if(!value) error = 'Confirmar contraseña es requerido.'
        break;
    case 'name':
        if(!value) error = 'Nombre requerido.'
        else if(!/^[A-Z][A-Za-z]{1,15} ?[A-Z]?[A-Za-z]{1,15}$/.test(value)) error = 'El nombre debe estar capitalizado y contener solo letras.'
        break;
    case 'last_name':
        if(!value) error = 'Apellido requerido.'
        else if(!/^[A-Z][A-Za-z]{1,34}$/.test(value)) error = 'El apellido debe estar capitalizado y contener solo letras.'
        break;
    default:
        break;
    }
 return error
}
