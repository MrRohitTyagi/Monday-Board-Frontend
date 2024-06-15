import axiosInstance from "@/utils/axiosinstance";

const AUTH_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_AUTH_BASE_URL) as string;

async function login(payload: string) {
  const { data } = await axiosInstance().post(
    `${AUTH_BASE_URL}/login`,
    payload
  );
  if (data.success === false) {
    throw Error(data.message);
  }
  return {
    response: data.response,
    message: data.message,
    success: data.success,
    token: data.token,
  };
}
async function signup(payload: string) {
  const { data } = await axiosInstance().post(
    `${AUTH_BASE_URL}/signup`,
    payload
  );
  if (data.success === false) {
    throw Error(data.message);
  }
  return {
    response: data.response,
    message: data.message,
    success: data.success,
    token: data.token,
  };
}

export { login, signup };
