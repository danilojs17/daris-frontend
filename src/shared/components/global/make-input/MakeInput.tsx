import React, { FC } from 'react'
import { Input } from '@nextui-org/react'
import { Controller } from 'react-hook-form'
import { Element } from '@interface/constant/join/Join'

type IMakeInput<T extends Element = Element> = T

const MakeInput: FC<IMakeInput> = ({ name, rules, control, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue=''
      render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
        <Input
          {...props}
          isRequired={props.required}
          onChange={onChange}
          defaultValue={value}
        />
      )}
    />
  )
}

export default MakeInput
