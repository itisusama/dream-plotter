import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema, type LoginSchema, type RegisterSchema } from "@/lib/zod-schema";
import { loginUser, registerUser } from "@/functions/auth";
import { useNavigate } from "react-router-dom";

export default function AuthFactory() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginform = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerform = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onLoginSubmit(values: LoginSchema) {
    try {
      setLoading(true);
      const success = await loginUser(values);
      if (success) {
        loginform.reset();
        navigate("/dashboard");
      }
    } finally {
      setLoading(false);
    }
  }

  async function onRegisterSubmit(values: RegisterSchema) {
    setLoading(true);
    const success = await registerUser(values);
    if (success) {
      registerform.reset();
      setLoading(false);
      navigate("/dashboard");
    }
  }

  return { loading, setLoading, loginform, registerform, onLoginSubmit, onRegisterSubmit };
}