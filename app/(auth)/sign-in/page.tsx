"use client";

// LINK ROUTER
import { useRouter } from "next/navigation";

// ICONS
import { User, Lock } from "lucide-react";

// SCHEMA VALIDATION LIBRARY
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// FORM LIBRARY
import { useForm } from "react-hook-form";

// REACT
import { useTransition } from "react";

// SERVER ACTIONS
import { loginAction } from "@/app/actions/authActions";

export default function SignInPage() {
  // EMAIL & PASSWORD SCHEMA (Changed from userName to email)
  const signInSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });

  // SIGN IN DATA TYPES
  type signInObj = z.infer<typeof signInSchema>;

  // USEFORM LIBRARY
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<signInObj>({ resolver: zodResolver(signInSchema) });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSignIn = (data: signInObj) => {
    startTransition(async () => {
      try {
        const response = await loginAction(data.email, data.password);

        if (response.success) {
          if (response.role === "admin") {
            router.push("/admin");
          } else if (response.role === "startup") {
            router.push("/startup");
          } else if (response.role === "investor") {
            router.push("/investor");
          }
        } else {
          setError("root", {
            type: "manual",
            message: response.message || "Invalid email or password.",
          });
        }
      } catch (error) {
        setError("root", {
          type: "manual",
          message: "Something went wrong. Please try again.",
        });
      }
    });
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-neutral-950 p-4 font-sans text-neutral-100">
      <form
        onSubmit={handleSubmit(onSignIn)}
        className="flex flex-col gap-4 bg-neutral p-6 sm:p-8 w-full max-w-112.5 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-bold mt-4 mb-7 mx-auto lg:text-4xl">
            Welcome Back
          </h1>

          {/* EMAIL FIELD */}
          <label className="font-semibold text-sm">Email Address</label>
          <div className="flex items-center h-12 px-3 border-[1.5px] border-neutral-800 rounded-xl transition-colors duration-200 focus-within:border-tertiary-500">
            <User className="w-5 h-5 text-neutral-500" />
            <input
              placeholder="Enter your Email"
              className="ml-2.5 w-full h-full bg-transparent outline-none placeholder:text-neutral-500 text-sm"
              {...register("email")}
            />
          </div>
          <p className="text-error text-sm">{errors.email?.message}</p>
        </div>

        {/* PASSWORD FIELD */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-sm">Password</label>
          <div className="flex items-center h-12 px-3 border-[1.5px] border-neutral-800 rounded-xl transition-colors duration-200 focus-within:border-tertiary-500">
            <Lock className="w-5 h-5 text-neutral-500" />
            <input
              placeholder="Enter your Password"
              className="ml-2.5 w-full h-full bg-transparent outline-none placeholder:text-neutral-500 text-sm"
              type="password"
              {...register("password")}
            />
          </div>
          <p className="text-error text-sm">{errors.password?.message}</p>
        </div>

        {/* REMEMBER ME + FORGET PASSWORD */}
        <div className="flex flex-row items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 accent-tertiary-500 cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm cursor-pointer">
              Remember me
            </label>
          </div>
          <span className="text-sm text-tertiary-500 font-medium cursor-pointer hover:underline transition-all">
            Forgot password?
          </span>
        </div>

        {errors.root && (
          <div className="text-error text-sm rounded-lg text-center font-medium -mb-3">
            {errors.root.message}
          </div>
        )}

        {/* SIGN IN BUTTON */}
        <button
          type="submit"
          disabled={isPending}
          className={`mt-2 h-12 w-full font-medium text-[15px] rounded-xl transition-colors duration-200 ${
            isPending
              ? "bg-neutral-600 text-neutral-400 cursor-not-allowed"
              : "bg-neutral-100 text-neutral hover:bg-neutral-200"
          }`}
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>

        {/* SIGN UP */}
        <p className="text-center text-sm text-neutral-400 my-1">
          Don&apos;t have an account?
          <button
            type="button"
            onClick={() => router.push("/sign-up")}
            className="text-tertiary-500 font-medium cursor-pointer hover:underline ml-1"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
