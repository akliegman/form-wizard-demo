import { User } from "../definitions";

export const fetchMe = async () => {
  try {
    const response = await fetch("/api/users/me");
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await fetch("/api/users/get-all");
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export const fetchLogout = async () => {
  try {
    const response = await fetch("/api/users/logout");
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export const createUser = async (
  body: Pick<User, "email" | "password" | "onboarding_step">,
) => {
  try {
    const response = await fetch("/api/users/create", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export const updateUser = async (body: Partial<User>) => {
  try {
    const response = await fetch("/api/users/update", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
};
