import { Link } from "react-router-dom";
import { ui } from "@/imports/ui";
import { Icon } from "@/lib/icons";
import { useState } from "react";
import AuthFactory from "@/factory/auth-factory";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const authFactory = AuthFactory()

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <ui.Form {...authFactory.loginform}>
        <form
          onSubmit={authFactory.loginform.handleSubmit(authFactory.onLoginSubmit)}
          className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
          noValidate>
          <div className="p-8 pb-6">
            <div>
              <Link to="/" aria-label="go home">
                <img src="/logo.png" alt="logo" className="w-9 h-9" />
              </Link>
              <h1 className="mb-1 mt-4 text-xl font-semibold">
                Sign In to Dream Plotter
              </h1>
              <p className="text-sm">Welcome back! Sign in to continue</p>
            </div>

            <hr className="my-4 border-dashed" />

            <div className="space-y-6">
              <ui.FormField
                control={authFactory.loginform.control}
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

              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <ui.Label htmlFor="pwd" className="text-sm">
                    Password
                  </ui.Label>
                  <ui.Button asChild variant="link" size="sm">
                    <Link
                      to="/reset"
                      className="link intent-info variant-ghost text-sm">
                      Forgot your Password ?
                    </Link>
                  </ui.Button>
                </div>
                <ui.FormField
                  control={authFactory.loginform.control}
                  name="password"
                  render={({ field }) => (
                    <ui.FormItem>
                      <div className="relative">
                        <ui.FormControl>
                          <ui.Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
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

              <ui.Button type="submit" className="w-full" disabled={authFactory.loading}>
                {authFactory.loading ? "Loging in..." : "Login"}
              </ui.Button>
            </div>
          </div>

          <div className="bg-muted rounded-lg border p-3">
            <p className="text-accent-foreground text-center text-sm">
              Don't have an account ?
              <ui.Button asChild variant="link" className="px-2">
                <Link to="/register">Create account</Link>
              </ui.Button>
            </p>
          </div>
        </form>
      </ui.Form>
    </section>
  );
}