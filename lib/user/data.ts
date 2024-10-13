"use server";

import { UserFormInterface } from "@/types/interface";
import { signIn } from "@/auth";

export const upsertUser = async (data: UserFormInterface) => {
  const response = await fetch("http://localhost:3000/api/users/upsert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};

export const syncUserData = async (accessToken: string, identifier: string) => {
  const result = await fetch("http://localhost:3000/api/users/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken: accessToken,
      identifier: identifier,
    }),
  });

  const data = await result.json();

  if (data.code === 401) {
    return signIn("spotify");
  }
};
