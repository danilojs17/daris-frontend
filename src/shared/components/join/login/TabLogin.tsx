import React, { FC, useContext, useMemo } from 'react'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { useForm } from 'react-hook-form'
import { TabLogin } from '@interface/components/tab-login/TabLogin'
import { IAuthContext, IAuthPayload } from '@interface/context/auth/Auth'
import { AuthContext } from '@context/auth/AuthContext'
import { loginElement } from '@constant/join/login'
import MakeInput from '@components/global/make-input/MakeInput'

const Login: FC<TabLogin> = (props) => {
  const { handleSubmit, control, reset } = useForm<IAuthPayload>()
  const { login } = useContext<IAuthContext>(AuthContext)

  const onSubmit = (data: IAuthPayload) => {
    login(data)
    reset()
  }
  const join = useMemo(() => loginElement, [])

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {
        join.map((element, i) => {
          return element.elementType === 'div'
            ? <div className="w-full flex flex-row gap-4">
              {
                element.groups.map((child, i) => (
                  <MakeInput
                    key={i}
                    label={child.label}
                    name={child.name}
                    placeholder={child.placeholder}
                    type={child.type}
                    required={child.required}
                    control={control}
                  />
                ))
              }
            </div>
            : <MakeInput
              key={i}
              label={element.label}
              name={element.name}
              placeholder={element.placeholder}
              type={element.type}
              required={element.required}
              control={control}
            />
        })
      }
      <p className="text-center text-small">
        ¿No tienes una cuenta?{' '}
        <Link size="sm" onPress={() => {
          props.select('signup')
          reset()
        }}
        >
          Regístrate aquí
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type='submit'>
          Iniciar sesión
        </Button>
      </div>
    </form>
  )
}

export default Login
