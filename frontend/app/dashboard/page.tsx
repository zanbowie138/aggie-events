"use client"
import React, { useEffect, useState } from "react";
import AddUserForm from "./AddUserForm";
import AuthRedirect from '@/components/auth/AuthRedirect'
import { useAuth } from '@/components/auth/AuthContext'

export default function Database() {
  const { user } = useAuth();
  return (
    <>
      <AuthRedirect url={'/login'}/>
      {!user ?
      <div>
        loading...
      </div>:
      <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <AddUserForm />
      </div>
      }
    </>
  );
}