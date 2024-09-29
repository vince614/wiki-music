import { Get, Post } from "@/lib/api";
import { UserFormInterface } from "@/types/interface";

export const fetchAllUsers = async () => {
  return await Get("/users");
};

export const upsertUser = async (data: UserFormInterface) => {
  return await Post("/users/upsert", data);
};
