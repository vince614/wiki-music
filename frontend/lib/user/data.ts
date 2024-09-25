import { Get } from '../api';

export const fetchAllUsers = async () => {
  return await Get('/users');
}
