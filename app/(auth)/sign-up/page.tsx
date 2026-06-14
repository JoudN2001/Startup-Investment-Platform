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

export default function SignUpPage() {
  // USER NAME & PASSWORD SCHEMA
  const signUpSchema = z
    .object({
      fullName: z
        .string()
        .min(3, { message: "Full name must be at least 3 characters" }),

      email: z.email({ message: "Please enter a valid email address" }),

      userName: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" }),

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
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const router = useRouter();

  // SIGN UP DATA TYPES
  type signUpObj = z.infer<typeof signUpSchema>;

  // HANDLE SIGN IN
  const onSignUp = (data: signUpObj) => {
    // TODO: backend and DB for users
    router.push("/sign-up/submit");
    console.log(data);
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-neutral-950 p-4 font-sans text-neutral-100">
      <form
        onSubmit={handleSubmit(onSignUp)}
        className="flex flex-col gap-4 bg-neutral p-6 sm:p-8 w-full max-w-112.5 rounded-2xl shadow-lg"
      >
        {/* NAME FILED */}
        <h1 className="text-3xl font-bold mt-4 mx-auto lg:text-4xl">
          Create an Account
        </h1>
        <p className="text-neutral-400 text-base mb-4.5 mx-auto lg:text-lg max-w-2xl ">
          Join the sovereign gallery of investments.
        </p>
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

        {/* EMAIL FILED */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-sm">Email</label>
          <div className="flex items-center h-12 px-3 border-[1.5px] border-neutral-800 rounded-xl transition-colors duration-200 focus-within:border-tertiary-500">
            <AtSign className="w-5 h-5 text-neutral-500" />
            <input
              placeholder="Enter your Full Name"
              className="ml-2.5 w-full h-full bg-transparent outline-none placeholder:text-neutral-500 text-sm"
              {...register("email")}
            />
          </div>
          <p className="text-error text-sm">{errors.email?.message}</p>
        </div>

        {/* USER NAME FILED */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-sm">User Name</label>
          <div className="flex items-center h-12 px-3 border-[1.5px] border-neutral-800 rounded-xl transition-colors duration-200 focus-within:border-tertiary-500">
            <User className="w-5 h-5 text-neutral-500" />
            <input
              placeholder="Enter your UserName"
              className="ml-2.5 w-full h-full bg-transparent outline-none placeholder:text-neutral-500 text-sm"
              {...register("userName")}
            />
          </div>
          <p className="text-error text-sm">{errors.userName?.message}</p>
        </div>

        {/* PASSWORD FILIED */}
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

        {/* CONFIRM PASSWORD FILIED */}
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

        {/* TERM & PLICIES */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 accent-tertiary-500 cursor-pointer"
            {...register("termsAndPolicies")}
          />
          <label htmlFor="remember" className="text-sm cursor-pointer">
            I accept ther terms of use and Privacy Policy
          </label>
        </div>
        <p className="text-error text-sm">{errors.termsAndPolicies?.message}</p>

        {/* SIGN UP */}
        <button
          type="submit"
          className="mt-1 h-12 w-full bg-neutral-100 text-neutral font-medium text-[15px] rounded-xl hover:bg-neutral-200 transition-colors duration-200"
        >
          Sign Up
        </button>

        {/* SIGN IN */}
        <LinkButton href="/sign-in">
          <p className="text-center text-sm text-neutral-400 my-1">
            You have an account?
            <span className="text-tertiary-500 font-medium cursor-pointer hover:underline ml-1">
              Sign In
            </span>
          </p>
        </LinkButton>

        {/* EXTRA FEATURE: ADD SOCIAL MEDIA LOGIN OPTIONS */}
        {/* <div className="flex items-center gap-3 my-2">
          <div className="h-[1px] w-full bg-neutral-800"></div>
          <p className="text-sm text-neutral-500 whitespace-nowrap">Or With</p>
          <div className="h-[1px] w-full bg-neutral-800"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="flex-1 h-12 flex justify-center items-center gap-2.5 font-medium border border-neutral-800 bg-neutral rounded-xl cursor-pointer transition-colors duration-200 hover:border-tertiary-500 text-sm"
          >
            <svg viewBox="0 0 512 512" width="20" height="20">
              <path
                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256 c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456 C103.821,274.792,107.225,292.797,113.47,309.408z"
                fill="#FBBB00"
              />
              <path
                d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451 c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535 c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                fill="#518EF8"
              />
              <path
                d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512 c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771 c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                fill="#28B446"
              />
              <path
                d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012 c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0 C318.115,0,375.068,22.126,419.404,58.936z"
                fill="#F14336"
              />
            </svg>
            Google
          </button>

          <button
            type="button"
            className="flex-1 h-12 flex justify-center items-center gap-2.5 font-medium border border-neutral-800 bg-neutral rounded-xl cursor-pointer transition-colors duration-200 hover:border-tertiary-500 text-sm"
          >
            <svg viewBox="0 0 22.773 22.773" width="20" height="20">
              <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
              <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
            </svg>
            Apple
          </button>
        </div> */}
      </form>
    </div>
  );
}
