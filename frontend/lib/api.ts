import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const Get = async (url: string) => {
  try {
    const response = await axios.get(`${apiUrl}${url}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const Post = async (url: string, data: any) => {
  try {
    const response = await axios.post(`${apiUrl}${url}`, data);

    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
  }
};

export const Put = async (url: string, data: any) => {
  try {
    const response = await axios.put(`${apiUrl}${url}`, data);

    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

export const Delete = async (url: string) => {
  try {
    await axios.delete(`${apiUrl}${url}`);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
