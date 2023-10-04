import React, { FC, useMemo } from 'react'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { useForm } from 'react-hook-form'
import { ICreateUser } from '@interface/core/model/user/User'
import { ITabSignup } from '@interface/components/tab-signup/TabSignup'
import useUsersModel from '@model/user/UserModel'
import { joinElement } from '@constant/join/signup'
import MakeInput from '@components/global/make-input/MakeInput'

const Signup: FC<ITabSignup> = (props) => {
  const { createUser } = useUsersModel()
  const { control, handleSubmit, reset } = useForm<ICreateUser>()
  const onSubmit = (data: ICreateUser) => {
    createUser(data)
    reset()
  }

  const join = useMemo(() => joinElement, [])

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
        ¿Tienes una cuenta?{' '}
        <Link size="sm" onPress={() => {
          props.select('login')
          reset()
        }}>Iniciar sesión aqui
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type='submit'>
          Regístrarme
        </Button>
      </div>
    </form>
  )
}

export default Signup
