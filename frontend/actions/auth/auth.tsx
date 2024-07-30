import { account } from "@/Utils/appwrite";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import toast from "react-hot-toast";

export const loginUser = async (
  email: string,
  password: string,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    const res = await account.createEmailPasswordSession(email, password);

    // console.log(res);
  } catch (e) {
    console.log(e);
    // toast.error(e.response.data.message);
  } finally {
    setLoading(false);
  }
};

export const SignUp = async (
  name: string,
  email: string,
  password: string,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    await account.create(ID.unique(), email, password, name);

    await account.createVerification(email);
    toast.success("Successfully Registered");
  } catch (e) {
    console.log(e);
    toast.error("Server Error");
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
