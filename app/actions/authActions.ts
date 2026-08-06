"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function loginAction(email: string, password: string) {
  const supabase = await createClient();

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !user) {
    return { success: false, message: "Invalid email or password." };
  }
  const cookieStore = await cookies();
  cookieStore.set("userId", user.userId);
  cookieStore.set("userRole", user.role);

  return { success: true, role: user.role };
}

export async function signUpAction(formData: any) {
  const supabase = await createClient();

  const { data: existingUser } = await supabase
    .from("users")
    .select("userId")
    .eq("email", formData.email)
    .single();

  if (existingUser) {
    return { success: false, message: "This email is already registered." };
  }

  const { data: newUser, error } = await supabase
    .from("users")
    .insert([
      {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: "startup",
      },
    ])
    .select()
    .single();

  if (error || !newUser) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("userId", newUser.userId);
  cookieStore.set("userRole", newUser.role);

  return { success: true, role: newUser.role };
}