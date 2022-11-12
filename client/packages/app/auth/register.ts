import ApiManager from './ApiManager';

export const register = async ({email, password}) => {
  try {
    const result = await ApiManager('/registration', {
      method: 'POST',
      data: {user: {email, password, password_confirmation: password}},
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
