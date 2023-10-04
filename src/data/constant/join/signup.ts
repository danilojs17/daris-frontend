import { IJoinElements } from '@interface/constant/join/Join'

export const joinElement: Array<IJoinElements> = [
  {
    elementType: 'div',
    groups: [
      {
        elementType: 'input',
        label: 'Nombre',
        placeholder: 'Escribe tu Nombre',
        name: 'userFullName',
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
        label: 'Apellido',
        placeholder: 'Escribe tu Apellido',
        name: 'userLastName',
        required: true,
        rules: {
          required: true,
          maxLength: {
            value: 32,
            message: 'El maximo de carecteres es de 32'
          }
        },
        type: 'text'
      }
    ]
  },
  {
    elementType: 'input',
    label: 'Email',
    placeholder: 'Escribe tu Email',
    name: 'userEmail',
    required: true,
    rules: {
      required: true,
      maxLength: {
        value: 50,
        message: 'El maximo de carecteres es de 50'
      }
    },
    type: 'text'
  },
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
