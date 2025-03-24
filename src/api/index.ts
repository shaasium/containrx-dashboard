import axios from "axios";

const containrxApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
});

export const signIn = async (email: string, password: string) => {
  try {
    const { data } = await containrxApi.post("/auth/sign-in", {
      email,
      password,
    });
    return { data, err: null };
  } catch (err) {
    return { err, data: null };
  }
};

export const listImages = async (token: string) => {
  try {
    const { data } = await containrxApi.get("/image/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, err: null };
  } catch (err) {
    return { err, data: null };
  }
};
