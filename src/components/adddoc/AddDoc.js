import React from 'react';
import { useForm } from 'react-hook-form';
import { storage, ref, uploadBytes, getDownloadURL } from '../firebase/Firebase';
// import swal from 'sweetalert';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const AddDoc = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  // Watch the file upload input
  const fileUpload = watch('fileUpload');

  const onSubmit = async (data) => {
    try {
      // Create a reference to the file in Firebase Storage
      const fileRef = ref(storage, `documents/${data.fileUpload[0].name}`);

      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(fileRef, data.fileUpload[0]);

      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Add additional form data
      const formData = {
        documentName: data.documentName,
        fileType: data.fileType,
        priority: data.priority,
        date: data.date,
        fileUrl: downloadURL, // Store the file URL
      };

      console.log('Form Data:', formData);
      // Show success dialog
      Swal.fire({
        text: 'Document added successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })


      // Reset the form fields
      document.getElementById("addDocForm").reset();
      navigate("/view")

    } catch (error) {
      console.error('Upload failed:', error);

      // Show error dialog
      Swal.fire({
        title: 'Error!',
        text: 'Something wrong',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl mt-10">
    <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Add Document</h2>
    <form id="addDocForm" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  
      {/* Document Name */}
      <div>
        <label htmlFor="documentName" className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
        <input
          id="documentName"
          type="text"
          placeholder="Enter document name"
          {...register('documentName', { required: 'Document name is required' })}
          className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 shadow-sm"
        />
        {errors.documentName && <p className="text-red-600 text-sm mt-1">{errors.documentName.message}</p>}
      </div>
  
      {/* File Type */}
      <div>
        <label htmlFor="fileType" className="block text-sm font-medium text-gray-700 mb-1">Document File Type</label>
        <select
          id="fileType"
          {...register('fileType', { required: 'File type is required' })}
          className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 shadow-sm"
        >
          <option value="">Select a file type</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
          <option value="image">Image</option>
        </select>
        {errors.fileType && <p className="text-red-600 text-sm mt-1">{errors.fileType.message}</p>}
      </div>
  
      {/* Priority */}
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
        <select
          id="priority"
          {...register('priority', { required: 'Priority is required' })}
          className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 shadow-sm"
        >
          <option value="">Select priority</option>
          <option value="important">Important</option>
          <option value="usual">Usual</option>
        </select>
        {errors.priority && <p className="text-red-600 text-sm mt-1">{errors.priority.message}</p>}
      </div>
  
      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          id="date"
          type="date"
          {...register('date', { required: 'Date is required' })}
          className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 shadow-sm"
        />
        {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>}
      </div>
  
      {/* File Upload */}
      <div>
        <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-1">Upload Document</label>
        <input
          id="fileUpload"
          type="file"
          {...register('fileUpload', { required: 'File upload is required' })}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-100 hover:file:bg-blue-200"
        />
        {errors.fileUpload && <p className="text-red-600 text-sm mt-1">{errors.fileUpload.message}</p>}
      </div>
  
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg transition duration-300"
      >
        Submit
      </button>
    </form>
  </div>
  
  );
};

export default AddDoc;
