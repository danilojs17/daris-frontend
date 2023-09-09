import { ITabSignup } from '@interface/components/tab-signup/TabSignup';
import { ICreateUser } from '@interface/core/model/user/User';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { Tab } from '@nextui-org/tabs';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form'

const TabSignup: FC<ITabSignup> = (props) => {
  
	const { control, handleSubmit } = useForm<ICreateUser>()
  const onSubmit = (data: ICreateUser) => console.log(data)

  return (
    <Tab key={props.key} title="Regístrarme">
      <form className="flex flex-col gap-4 h-[300px]" onSubmit={handleSubmit(onSubmit)}>
        <Input isRequired label="Nombre" placeholder="Escribe tu name" type="password" />
        <Input isRequired label="Email" placeholder="Escribe tu email" type="email" />
        <Input
          isRequired
          label="Contraseña"
          placeholder="Escribe tu contraseña"
          type="password"
        />
        <p className="text-center text-small">
          ¿Tienes una cuenta?{" "}
          <Link size="sm" onPress={() => props.select('login')}>
            Iniciar sesión aqui
          </Link>
        </p>
        <div className="flex gap-2 justify-end">
          <Button fullWidth color="primary" type='submit'>
            Regístrarme
          </Button>
        </div>
      </form>
    </Tab>
  );
};

export default TabSignup;