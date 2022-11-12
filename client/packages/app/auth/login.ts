import ApiManager from './ApiManager';

export const login = async ({email, password}) => {
  try {
    const result = await ApiManager('/session', {
      method: 'POST',
      data: {user: {email, password}},
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
