import { ITabLogin } from '@interface/components/tab-login/TabLogin';
import { IAuthPayload } from '@interface/context/auth/Auth';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { Tab } from '@nextui-org/tabs';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form'

const TabLogin: FC<ITabLogin> = (props) => {
  
	const { control, handleSubmit } = useForm<IAuthPayload>()
  const onSubmit = (data: IAuthPayload) => console.log(data)

  return (
    <Tab key={props.key} title="Iniciar sesión">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input isRequired label="Email" placeholder="Escribe tu email" type="email" />
        <Input
          isRequired
          label="Contraseña"
          placeholder="Escribe tu contraseña"
          type="password"
        />
        <p className="text-center text-small">
          ¿No tienes una cuenta?{" "}
          <Link size="sm" onPress={() => props.select('sign-up')}>
            Regístrate aquí
          </Link>
        </p>
        <div className="flex gap-2 justify-end">
          <Button fullWidth color="primary" type='submit'>
            Inicir sesión
          </Button>
        </div>
      </form>
    </Tab>
  );
};

export default TabLogin;