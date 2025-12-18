import { FORGET, LOGIN, REGISTER, RESET, VERIFY_FORGET_OTP, VERIFY_REGISTER_OTP } from "@/lib/apiEndpoints";
import type { ForgetSchema, LoginSchema, NewPasswordSchema, RegisterSchema } from "@/lib/zod-schema";
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";

const setUser = useUserStore.getState().setUser;
console.log(setUser)
// REGISTER USER
export const registerUser = async (values: RegisterSchema) => {
  try {
    const res = await fetch(REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      }),
    });

    if (res.ok) {
      toast.success("User Registered");

      // Save email for OTP step
      localStorage.setItem("pendingEmail", values.email);

      return true;
    }

    toast.error(await res.text());
    return false;

  } catch (error) {
    toast.error("Something went wrong");
    return false;
  }
};


// VERIFY REGISTER OTP
export const verifyRegisterOtp = async (otp: string) => {
  try {
    const email = localStorage.getItem("pendingEmail");

    const res = await fetch(VERIFY_REGISTER_OTP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    if (!res.ok) {
      toast.error(await res.text());
      return false;
    }

    const data = await res.json();

    // Zustand store update
    const setUser = useUserStore.getState().setUser;
    setUser(data.user);

    // Save token + user
    localStorage.setItem("token", data.token);
    localStorage.removeItem("pendingEmail");

    return true;

  } catch (error) {
    toast.error("Something went wrong");
    return false;
  }
};

// LOGIN USER
export const loginUser = async (values: LoginSchema) => {
  try {
    const res = await fetch(LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    if (res.ok) {
      toast.success("User Loged in");
      const data = await res.json();

      const setUser = useUserStore.getState().setUser;

      // Zustand handles localStorage for user
      setUser(data.user);
      // Save token
      localStorage.setItem("token", data.token);
      return true;
    }

    toast.error(await res.text());
    return false;

  } catch (error) {
    toast.error("Something went wrong");
    return false;
  }
};

// FORGET PASSWORD
export const forgetPassword = async (values: ForgetSchema) => {
 try {
    const res = await fetch(FORGET, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
      }),
    });

       if (res.ok) {
      toast.success("Check Email to Reset Password");
      toast.success("Re-Enter Email If you don't get the otp");

      // Save email for OTP step
      localStorage.setItem("pendingEmail", values.email);

      return true;
    }

    toast.error(await res.text());
    return false;

  } catch (error) {
    toast.error("Something went wrong");
    return false;
  }
};

// VERIFY RESET OTP
export const verifyResetOtp = async (otp: string) => {
  try {
    const email = localStorage.getItem("pendingEmail");

    const res = await fetch(VERIFY_FORGET_OTP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    if (!res.ok) {
      toast.error(await res.text());
      return false;
    }

    toast.success("OTP verified. You may now reset your password.")

    return true;

  } catch (error) {
    toast.error("Something went wrong");
    return false;
  }
}

// NEW PASSWORD
export const newPassword = async (values: NewPasswordSchema) => {
  const email = localStorage.getItem("pendingEmail"); 
  try {
    const res = await fetch(RESET, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        newPassword: values.password
      }),
    });

       if (res.ok) {
      toast.success("Password reset successful");
      
      // remove pending email from local storage
      localStorage.removeItem("pendingEmail");

      return true;
    }

    toast.error(await res.text());
    return false;

  } catch (error) {
    toast.error("Something went wrong");
    return false;
  }
}