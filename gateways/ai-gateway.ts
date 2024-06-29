import axiosInstance from "@/utils/axiosinstance";

const AI_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_AI_BASE_URL) as string;

async function writeAI(payload: { prompt: string }) {
  try {
    const { data } = await axiosInstance().post(
      `${AI_BASE_URL}/generate`,
      payload
    );

    return {
      response: data.response,
      message: data.message,
      success: data.success,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: error.success,
    };
  }
}

export { writeAI };
