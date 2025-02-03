'use client'
import React from 'react';
import CreateOrgForm from './CreateOrgForm';

export default function CreateOrganizationPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className='max-w-[700px] w-full p-4'>
        <h1>Create Organization</h1>
        <CreateOrgForm />
      </div>
    </div>
  );
}

