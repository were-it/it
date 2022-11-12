import React, { useState } from 'react'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'
import { TextInput } from 'app/components/TextInput'
import { useAuth } from 'app/contexts/AuthContext'

import { MotiLink } from 'solito/moti'
import { Alert, Pressable } from 'react-native'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form'
import { register } from 'app/auth/Auth'

type FormValues = {
  email: string
  password: string
}

const EMAIL_REGEX = /^\S+@\S+\.\S+$/

export function SignUpScreen() {
  const { signUp } = useAuth()

  const { ...methods } = useForm({ mode: 'onChange' })

  const onSubmit: SubmitHandler<FormValues> = ({ email, password }) => {
    signUp(email, password)
  }

  const [formError, setError] = useState<Boolean>(false)

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log({ errors })
  }

  return (
    <View className="mx-auto w-full flex-1 items-center justify-center px-5 py-8">
      <H1>Sign up for It</H1>
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
                textContentType="emailAddress"
                rules={{
                  required: 'Email is required',
                  pattern: EMAIL_REGEX,
                }}
                setFormError={setError}
              />
              <TextInput
                name="password"
                secureTextEntry
                placeholder="Password"
                textContentType="newPassword"
                rules={{ required: 'Password is required' }}
                setFormError={setError}
              />
            </FormProvider>
          </>
        )}
        <View className="mt-6">
          <Pressable onPress={methods.handleSubmit(onSubmit, onError)}>
            <View className="w-full items-center rounded-md bg-blue-600 py-3">
              <Text className="font-bold text-white">Sign Up</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
