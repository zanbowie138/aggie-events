import React from "react";

export default function CreateOrgForm() {
  return (
    <form className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="organizationName" className="mb-2 text-sm font-medium text-gray-700">Organization Name:</label>
        <input type="text" id="organizationName" name="organizationName" required className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">Email:</label>
        <input type="email" id="email" name="email" required className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700">Description:</label>
        <textarea id="description" name="description" required className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        
      </div>
      <button type="submit" className="px-4 py-2 font-medium text-white bg-maroon-400 rounded-md shadow-sm hover:bg-maroon-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create</button>
    </form>
  );
}