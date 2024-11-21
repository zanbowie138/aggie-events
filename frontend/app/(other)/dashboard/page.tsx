"use client";
import React, { useEffect, useState } from "react";
import AddUserForm from "./AddUserForm";
import AuthSuspense from "@/components/auth/AuthSuspense";

export default function Database() {
  return (
    <>
      <AuthSuspense>
        <AddUserForm />
      </AuthSuspense>
    </>
  );
}
