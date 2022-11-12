import React from 'react';
import { View } from 'app/design/view'
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, Text } from 'react-native';
import { useController, useFormContext, UseControllerProps } from 'react-hook-form';
import { styled } from 'nativewind';

const StyledRNTextInput = styled(RNTextInput)

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  name: string
  defaultValue?: string
  setFormError: Function
}

const ControlledInput = (props: TextInputProps) => {
  const formContext = useFormContext();
  const { formState } = formContext;
  const {
    name,
    rules,
    defaultValue,
    ...inputProps
  } = props;
  const { field } = useController({ name, rules, defaultValue });
  const hasError = Boolean(formState?.errors[name]);

  return (
    <View>
      <View>
        <StyledRNTextInput
          className="border-b border-gray-300 px-2 py-2 my-2 w-full outline-none focus:border-blue-500"
          autoCapitalize="none"
          textAlign="left"
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          returnKeyType="done"
          {...inputProps}
        />
        <View>
          {hasError && (<Text className="text-red-600 text-xs px-2">{formState.errors[name].message}</Text>)}
        </View>
      </View>
    </View>

  );
}

export const TextInput = (props: TextInputProps) => {
  const {
    name,
    rules,
    defaultValue,
    setFormError,
    ...inputProps
  } = props;
  const formContext = useFormContext();

  // Placeholder until input name is initialized
  if (!formContext || !name) {
    const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
    console.error(msg)
    setFormError(true)
    return null
  }

  return <ControlledInput {...props} />;
};
