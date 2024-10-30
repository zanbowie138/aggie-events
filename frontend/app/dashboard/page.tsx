"use client"
import React, { useEffect, useState } from "react";
import AddUserForm from "./AddUserForm";
import AuthRedirect from '@/components/auth/AuthRedirect'
import { useAuth } from '@/components/auth/AuthContext'
import AuthSuspense from "@/components/auth/AuthSuspense";

export default function Database() {
  const { user } = useAuth();
  return (
    <>
      <AuthRedirect url={'/login'}/>
      <AuthSuspense>
        <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <AddUserForm />
        </div>
      </AuthSuspense>
    </>
  );
}