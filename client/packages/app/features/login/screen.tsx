import React, { useState } from 'react'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'
import { TextInput } from 'app/components/TextInput'

import { MotiLink } from 'solito/moti'
import { Alert, Pressable } from 'react-native'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form'
import { useAuth } from 'app/hooks/auth/use-auth'

type FormValues = {
  email: string
  password: string
}

const EMAIL_REGEX = /^\S+@\S+\.\S+$/

export function LoginScreen() {
  const { login } = useAuth()

  const { ...methods } = useForm({ mode: 'onChange' })

  const onSubmit: SubmitHandler<FormValues> = ({ email, password }) => {
    login(email, password)
  }

  const [formError, setError] = useState<Boolean>(false)

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log({ errors })
  }

  return (
    <View className="mx-auto w-full flex-1 items-center justify-center px-5 py-8">
      <H1>Log in to It</H1>
      <View className="w-full sm:max-w-md">
        {formError ? (
          <View>
            <Text style={{ color: 'red' }}>
              There was a problem loading the form. Please try again later.
            </Text>
          </View>
        ) : (
          <>
            <FormProvider {...methods}>
              <TextInput
                name="email"
                placeholder="Email"
                keyboardType="email-address"
                rules={{
                  required: 'Email is required',
                  pattern: EMAIL_REGEX,
                }}
                setFormError={setError}
                returnKeyType="next"
              />
              <TextInput
                name="password"
                secureTextEntry
                placeholder="Password"
                rules={{ required: 'Password is required' }}
                setFormError={setError}
                returnKeyType="go"
              />
            </FormProvider>
          </>
        )}
        <View className="mt-6">
          <Pressable onPress={methods.handleSubmit(onSubmit, onError)}>
            <View className="w-full items-center rounded-md bg-blue-600 py-3">
              <Text className="font-bold text-white">Log In</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
