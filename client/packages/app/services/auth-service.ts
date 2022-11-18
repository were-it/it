import ApiManager from './ApiManager'

export type AuthData = {
  data: {
    data: {
      access_token: string
      renewal_token: string
    }
  }
}

const signIn = (email: string, password: string): Promise<AuthData> => {
  return ApiManager('/session', {
    method: 'POST',
    data: { user: { email, password } },
  })
}

const signUp = (
  email: string,
  password: string,
  username: string
): Promise<AuthData> => {
  return ApiManager('/registration', {
    method: 'POST',
    data: {
      user: { email, password, password_confirmation: password, username },
    },
  })
}

const renew = (renewal_token: string | undefined): Promise<AuthData> => {
  return ApiManager('/session/renew', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${renewal_token}`,
    },
    withCredentials: false,
  })
}

export const authService = {
  signIn,
  signUp,
  renew,
}
