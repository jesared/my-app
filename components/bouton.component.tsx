"use client";

import { LogOutIcon } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <div className="p-4 hover:bg-white rounded">
      <button className="flex items-center" style={{ marginRight: 10 }} onClick={() => signOut()}>
        <LogOutIcon className="mr-2 h-5 w-5" />Sign Out
      </button>
    </div>
    
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
