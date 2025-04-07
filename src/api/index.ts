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

export const pullImage = async (token: string, image: string, tag: string) => {
  try {
    const { data } = await containrxApi.get(`/image/pull/${image}:${tag}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, err: null };
  } catch (err) {
    return { err, data: null };
  }
};

export const removeImage = async (token: string, imageId: string) => {
  try {
    const { data } = await containrxApi.delete(`/image/remove/${imageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, err: null };
  } catch (err) {
    return { err, data: null };
  }
};

export const listContainers = async (token: string) => {
  try {
    const { data } = await containrxApi.get("/container/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, err: null };
  } catch (err) {
    return { err, data: null };
  }
};

export const createContainer = async (token: string, body: object) => {
  try {
    const { data } = await containrxApi.post("/container/create", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, err: null };
  } catch (err) {
    return { err, data: null };
  }
};

export const pauseContainer = async (token: string, containerId: string) => {
  try {
    const { data } = await containrxApi.put(
      "/container/pause",
      { containerId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data, err: null };
  } catch (err) {
    return { err, data: null };
  }
};

export const unpauseContainer = async (token: string, containerId: string) => {
  try {
    const { data } = await containrxApi.put(
      "/container/unpause",
      { containerId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data, err: null };
  } catch (err) {
    return { err, data: null };
  }
};

export const stopContainer = async (token: string, containerId: string) => {
  try {
    const { data } = await containrxApi.put(
      "/container/stop",
      { containerId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data, err: null };
  } catch (err) {
    return { err, data: null };
  }
};

export const resumeContainer = async (token: string, containerId: string) => {
  try {
    const { data } = await containrxApi.put(
      "/container/resume",
      { containerId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data, err: null };
  } catch (err) {
    return { err, data: null };
  }
};

export const removeContainer = async (token: string, containerId: string) => {
  try {
    const { data } = await containrxApi.put(
      "/container/remove",
      { containerId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data, err: null };
  } catch (err) {
    return { err, data: null };
  }
};
