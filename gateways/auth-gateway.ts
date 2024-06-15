import axiosInstance from "@/utils/axiosinstance";

const AUTH_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_AUTH_BASE_URL) as string;

async function login(payload: string) {
  const { data } = await axiosInstance().post(
    `${AUTH_BASE_URL}/login`,
    payload
  );
  return {
    response: data.response,
    message: data.message,
    success: data.success,
  };
}
async function signup(payload: string) {
  const { data } = await axiosInstance().post(
    `${AUTH_BASE_URL}/signup`,
    payload
  );
  return {
    response: data.response,
    message: data.message,
    success: data.success,
    token: data.token,
  };
}

export { login, signup };
