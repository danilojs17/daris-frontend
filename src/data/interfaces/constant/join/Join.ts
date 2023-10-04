import { Control, FieldPath, FieldPathValue, FieldValues, RegisterOptions } from 'react-hook-form'

export type Element<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  elementType: 'input',
  name: TName;
  label: string;
  placeholder: string;
  required: boolean;
  type: string;
  rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  shouldUnregister?: boolean;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  control?: Control<TFieldValues>;
  disabled?: boolean;
};

export type IGroupElement = {
  elementType: 'div',
  groups: Array<Element>
}

export type IJoinElements = Element |IGroupElement
