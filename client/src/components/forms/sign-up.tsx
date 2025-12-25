import { Link } from "react-router-dom";
import { ui } from "@/imports/ui";
import { Icon } from "@/lib/icons";
import { useState } from "react";
import AuthFactory from "@/factory/auth-factory";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const authFactory = AuthFactory();

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <ui.Form {...authFactory.registerform}>
        <form
          onSubmit={authFactory.registerform.handleSubmit(
            authFactory.onRegisterSubmit
          )}
          className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
          noValidate>
          <div className="p-8 pb-6">
            <div>
              <Link to="/" aria-label="go home">
                <img src="/logo.png" alt="logo" className="w-9 h-9" />
              </Link>
              <h1 className="mb-1 mt-4 text-xl font-semibold">
                Register In to Dream Plotter
              </h1>
              <p className="text-sm">Hi! Sign up to create account</p>
            </div>

            <hr className="my-4 border-dashed" />

            <div className="space-y-5">
              <div className="">
                <div className="space-y-2">
                  <ui.FormField
                    control={authFactory.registerform.control}
                    name="fullName"
                    render={({ field }) => (
                      <ui.FormItem>
                        <ui.FormLabel>Full name</ui.FormLabel>
                        <ui.FormControl>
                          <ui.Input placeholder="Jane Doe" {...field} />
                        </ui.FormControl>
                        <ui.FormMessage />
                      </ui.FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <ui.FormField
                  control={authFactory.registerform.control}
                  name="email"
                  render={({ field }) => (
                    <ui.FormItem>
                      <ui.FormLabel>Email</ui.FormLabel>
                      <ui.FormControl>
                        <ui.Input placeholder="you@example.com" {...field} />
                      </ui.FormControl>
                      <ui.FormMessage />
                    </ui.FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <ui.FormField
                  control={authFactory.registerform.control}
                  name="password"
                  render={({ field }) => (
                    <ui.FormItem>
                      <ui.FormLabel>Password</ui.FormLabel>
                      <div className="relative">
                        <ui.FormControl>
                          <ui.Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                          />
                        </ui.FormControl>
                        <button
                          type="button"
                          aria-label="Toggle password visibility"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center">
                          {showPassword ? (
                            <Icon.EyeOff size={18} />
                          ) : (
                            <Icon.Eye size={18} />
                          )}
                        </button>
                      </div>
                      <ui.FormMessage />
                    </ui.FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <ui.FormField
                  control={authFactory.registerform.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <ui.FormItem>
                      <ui.FormLabel>Retype password</ui.FormLabel>
                      <div className="relative">
                        <ui.FormControl>
                          <ui.Input
                            {...field}
                            type={showConfirm ? "text" : "password"}
                            placeholder="Retype password"
                          />
                        </ui.FormControl>
                        <button
                          type="button"
                          aria-label="Toggle confirm password visibility"
                          onClick={() => setShowConfirm((s) => !s)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center">
                          {showConfirm ? (
                            <Icon.EyeOff size={18} />
                          ) : (
                            <Icon.Eye size={18} />
                          )}
                        </button>
                      </div>
                      <ui.FormMessage />
                    </ui.FormItem>
                  )}
                />
              </div>

              <ui.Button
                type="submit"
                className="w-full"
                disabled={authFactory.loading}>
                {authFactory.loading ? "Registering..." : "Register"}
              </ui.Button>
            </div>
          </div>

          <div className="bg-muted rounded-lg border p-3">
            <p className="text-accent-foreground text-center text-sm">
              Have an account ?
              <ui.Button asChild variant="link" className="px-2">
                <Link to="/login">Sign In</Link>
              </ui.Button>
            </p>
          </div>
        </form>
      </ui.Form>
    </section>
  );
}
