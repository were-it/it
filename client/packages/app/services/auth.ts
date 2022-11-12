import ApiManager from './ApiManager'

export type AuthData = {
  data: {
    access_token: string
    renewal_token: string
  }
}

const signIn = (email: string, password: string): Promise<AuthData> => {
  try {
    return ApiManager('/session', {
      method: 'POST',
      data: { user: { email, password } },
    })
  } catch (e) {
    return e
  }
}

const signUp = (email: string, password: string): Promise<AuthData> => {
  try {
    return ApiManager('/registration', {
      method: 'POST',
      data: { user: { email, password, password_confirmation: password } },
    })
  } catch (e) {
    return e
  }
}

export const authService = {
  signIn,
  signUp,
}
