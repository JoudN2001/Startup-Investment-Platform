"use client";

// LINK ROUTER
import { useRouter } from "next/navigation";

// ICONS
import { User, Lock, AtSign } from "lucide-react";

// SCHEMA VALIDATION LIBRARY
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// FORM LIBRARY
import { useForm } from "react-hook-form";

// COMPONENTS
import LinkButton from "@/components/ui/LinkButton";

// REACT
import { useTransition } from "react";

// SERVER ACTIONS
import { signUpAction } from "@/app/actions/authActions";

export default function SignUpPage() {
  // USER NAME & PASSWORD SCHEMA
  const signUpSchema = z
    .object({
      fullName: z
        .string()
        .min(3, { message: "Full name must be at least 3 characters" }),

      email: z.email({ message: "Please enter a valid email address" }),

      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),

      confirmPassword: z
        .string()
        .min(1, { message: "Please confirm your password" }),

      termsAndPolicies: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and policies to sign up",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  // USEFORM LIBRARY
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // SIGN UP DATA TYPES
  type signUpObj = z.infer<typeof signUpSchema>;

  // HANDLE SIGN UP
  const onSignUp = (data: signUpObj) => {
    startTransition(async () => {
      try {
        const response = await signUpAction(data);

        if (response.success) {
          // توجيه المستخدم إلى لوحة التحكم الخاصة به
          router.push("/startup");
        } else {
          setError("root", {
            type: "manual",
            message: response.message || "Failed to create account.",
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
        onSubmit={handleSubmit(onSignUp)}
        className="flex flex-col gap-4 bg-neutral p-6 sm:p-8 w-full max-w-112.5 rounded-2xl shadow-lg"
      >
        {/* HEADER */}
        <h1 className="text-3xl font-bold mt-4 mx-auto lg:text-4xl">
          Create an Account
        </h1>
        <p className="text-neutral-400 text-base mb-4.5 mx-auto lg:text-lg max-w-2xl text-center">
          Join the sovereign gallery of investments.
        </p>

        {/* FULL NAME FIELD */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-sm">Full Name</label>
          <div className="flex items-center h-12 px-3 border-[1.5px] border-neutral-800 rounded-xl transition-colors duration-200 focus-within:border-tertiary-500">
            <User className="w-5 h-5 text-neutral-500" />
            <input
              placeholder="Enter your Full Name"
              className="ml-2.5 w-full h-full bg-transparent outline-none placeholder:text-neutral-500 text-sm"
              {...register("fullName")}
            />
          </div>
          <p className="text-error text-sm">{errors.fullName?.message}</p>
        </div>

        {/* EMAIL FIELD */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-sm">Email</label>
          <div className="flex items-center h-12 px-3 border-[1.5px] border-neutral-800 rounded-xl transition-colors duration-200 focus-within:border-tertiary-500">
            <AtSign className="w-5 h-5 text-neutral-500" />
            <input
              placeholder="Enter your Email Address"
              className="ml-2.5 w-full h-full bg-transparent outline-none placeholder:text-neutral-500 text-sm"
              {...register("email")}
            />
          </div>
          <p className="text-error text-sm">{errors.email?.message}</p>
        </div>

        {/* PASSWORD FIELD */}
        <div className="flex flex-col gap-1.5">
          <div>
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
          </div>
          <p className="text-error text-sm">{errors.password?.message}</p>
        </div>

        {/* CONFIRM PASSWORD FIELD */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-sm">Confirm Password</label>
          <div className="flex items-center h-12 px-3 border-[1.5px] border-neutral-800 rounded-xl transition-colors duration-200 focus-within:border-tertiary-500">
            <Lock className="w-5 h-5 text-neutral-500" />
            <input
              placeholder="Confirm your Password"
              className="ml-2.5 w-full h-full bg-transparent outline-none placeholder:text-neutral-500 text-sm"
              type="password"
              {...register("confirmPassword")}
            />
          </div>
          <p className="text-error text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>

        {/* TERMS & POLICIES */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 accent-tertiary-500 cursor-pointer"
            {...register("termsAndPolicies")}
          />
          <label htmlFor="terms" className="text-sm cursor-pointer">
            I accept the terms of use and Privacy Policy
          </label>
        </div>
        <p className="text-error text-sm">{errors.termsAndPolicies?.message}</p>

        {/* ROOT ERROR MESSAGE */}
        {errors.root && (
          <div className="text-error text-sm rounded-lg text-center font-medium -mb-3">
            {errors.root.message}
          </div>
        )}

        {/* SIGN UP BUTTON */}
        <button
          type="submit"
          disabled={isPending}
          className={`mt-1 h-12 w-full font-medium text-[15px] rounded-xl transition-colors duration-200 ${
            isPending
              ? "bg-neutral-600 text-neutral-400 cursor-not-allowed"
              : "bg-neutral-100 text-neutral hover:bg-neutral-200"
          }`}
        >
          {isPending ? "Creating Account..." : "Sign Up"}
        </button>

        {/* SIGN IN LINK */}
        <LinkButton href="/sign-in">
          <p className="text-center text-sm text-neutral-400 my-1">
            You have an account?
            <span className="text-tertiary-500 font-medium cursor-pointer hover:underline ml-1">
              Sign In
            </span>
          </p>
        </LinkButton>
      </form>
    </div>
  );
}
