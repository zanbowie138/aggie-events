import React, { useCallback } from "react";
import Dropzone, { useDropzone, DropzoneOptions } from "react-dropzone";

export default function CreateOrgForm() {
  const onDropCallback = useCallback((acceptedFiled: File[]) => { // TODO: use correct type
    console.log(); // TODO: handle file upload // TODO: set up image server
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {'image/*': ['.png', '.jpg', '.jpeg']},
    onDrop: onDropCallback,
    multiple: false,
    onDragEnter: () => console.log('drag enter'),
    onDragOver: () => console.log('drag over'),
    onDragLeave: () => console.log('drag leave'),
  });


  return (
    <form className="space-y-6">
      // TODO: https://www.youtube.com/watch?v=Tdzas-IlKSM
      <div className="flex flex-col">
        // TODO: floating label (label starts inside of the text box, then moves on top when focused or text in box)
        <label htmlFor="organizationName" className="mb-2 text-sm font-medium text-gray-700">Organization Name:</label>
        <input type="text" id="organizationName" name="organizationName" required className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">Email:</label>
        <input type="email" id="email" name="email" required className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700">Description:</label>
        <textarea id="description" name="description" required className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        <label htmlFor="logodrop" className="mb-2 text-sm font-medium text-gray-700">Logo:</label>
        <div {...getRootProps({id: "logodrop", className: "dropzone flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-md my-4"})}>
          <input {...getInputProps()} type="file" />
          {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
      </div>
      <button type="submit" className="px-4 py-2 font-medium text-white bg-maroon-400 rounded-md shadow-sm hover:bg-maroon-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create</button>
    </form>
  );
}