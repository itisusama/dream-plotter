import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { loginSchema, type LoginSchema } from "@/lib/zod-schema";
import { loginUser } from "@/functions/auth";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

async function onSubmit(values: LoginSchema) {
  try {
    setLoading(true);
    const success = await loginUser(values);
    if (success) {
      form.reset();
      navigate("/dashboard");
    }
  } finally {
    setLoading(false);
  }
}

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
          noValidate>
          <div className="p-8 pb-6">
            <div>
              <Link to="/" aria-label="go home">
                <img src="/logo.png" alt="logo" className="w-9 h-9" />
              </Link>
              <h1 className="mb-1 mt-4 text-xl font-semibold">
                Sign In to FinTracker
              </h1>
              <p className="text-sm">Welcome back! Sign in to continue</p>
            </div>

            <hr className="my-4 border-dashed" />

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pwd" className="text-sm">
                    Password
                  </Label>
                  <Button asChild variant="link" size="sm">
                    <Link
                      to="/reset"
                      className="link intent-info variant-ghost text-sm">
                      Forgot your Password ?
                    </Link>
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                          />
                        </FormControl>
                        <button
                          type="button"
                          aria-label="Toggle password visibility"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center">
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loging in..." : "Login"}
              </Button>
            </div>
          </div>

          <div className="bg-muted rounded-(--radius) border p-3">
            <p className="text-accent-foreground text-center text-sm">
              Don't have an account ?
              <Button asChild variant="link" className="px-2">
                <Link to="/register">Create account</Link>
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
}
