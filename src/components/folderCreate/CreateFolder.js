import React, { useState } from 'react';
import { storage, ref, uploadBytes } from '../firebase/Firebase'; // Import Firebase methods

const CreateFolder = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setFolderName('');
    setError('');
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleAddFolder = async () => {
    if (!folderName.trim()) {
      setError('Folder name is required');
      return;
    }

    try {
      const folderRef = ref(storage, `folders/${folderName}`);
      // Example: Create an empty file as a placeholder for the folder
      await uploadBytes(folderRef, new Blob(), { contentType: 'text/plain' });
      // Close the popup and reset the state
      handleClosePopup();
      alert('Folder created successfully');
    } catch (error) {
      setError('Failed to create folder');
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className='py-3 px-4 bg-gray-700 text-white rounded-xl'
        onClick={handleOpenPopup}
      >
        Create Folder
      </button>

      {isPopupOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-lg font-bold mb-4'>Create New Folder</h2>
            <input
              type='text'
              value={folderName}
              onChange={handleFolderNameChange}
              placeholder='Enter folder name'
              className='w-full p-2 border border-gray-300 rounded-md mb-4'
            />
            {error && <p className='text-red-500 mb-4'>{error}</p>}
            <button
              className='py-2 px-4 bg-blue-500 text-white rounded-md mr-2'
              onClick={handleAddFolder}
            >
              Add Folder
            </button>
            <button
              className='py-2 px-4 bg-gray-300 text-gray-800 rounded-md'
              onClick={handleClosePopup}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateFolder;
