import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.deezer.com',
});

export const fetchSong = async (id: string) => {
  const { data } = await api.get(`/track/${id}`);
  return data;
};

export const fetchSongs = async (query: string) => {
  const { data } = await api.get(`/search?q=${query}`);
  return data;
};
