"use client";
import React, { useEffect, useState } from "react";
import AddUserForm from "./AddUserForm";
import AuthSuspense from "@/components/auth/AuthSuspense";

export default function Database() {
    return (
        <>
            <AuthSuspense>
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <AddUserForm />
                </div>
            </AuthSuspense>
        </>
    );
}
