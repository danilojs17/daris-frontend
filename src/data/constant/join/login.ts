import { IJoinElements } from '@interface/constant/join/Join'

export const loginElement: Array<IJoinElements> = [
  {
    elementType: 'input',
    label: 'Usuario',
    placeholder: 'Escribe tu usuario',
    name: 'username',
    required: true,
    rules: {
      required: true,
      maxLength: {
        value: 32,
        message: 'El maximo de carecteres es de 32'
      }
    },
    type: 'text'
  },
  {
    elementType: 'input',
    label: 'Contraseña',
    placeholder: 'Escribe tu Contraseña',
    name: 'userPassword',
    required: true,
    rules: {
      required: true,
      maxLength: {
        value: 50,
        message: 'El maximo de carecteres es de 50'
      }
    },
    type: 'password'
  }
]
