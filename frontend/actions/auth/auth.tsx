import { account } from "@/Utils/appwrite";
import toast from "react-hot-toast";

export const loginUser = async (
  email: string,
  password: string,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    console.log(email, password);
    const res = await account.createEmailPasswordSession(email, password);
    console.log(res);
  } catch (e) {
    console.log(e);
    // toast.error(e.response.data.message);
  } finally {
    setLoading(false);
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    toast.success("Logged out successfully");
  } catch (e) {
    console.log(e);
    toast.error("Failed to logout. Please try again.");
  } finally {
  }
};
