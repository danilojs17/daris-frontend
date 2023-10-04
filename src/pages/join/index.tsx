import React, { Key, useState } from 'react'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import Login from '@components/join/login/TabLogin'
import Signup from '@components/join/signup/TabSignup'

const JoinPage = () => {
  const [selected, setSelected] = useState<Key>('login')

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <div className="flex justify-center">
        <Card className="max-w-md w-[340px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key='login' title="Iniciar sesión">
                <Login select={setSelected} />
              </Tab>
              <Tab key='signup' title="Regístrarme">
                <Signup select={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default JoinPage
