import React, { useEffect, useState } from "react";
import { storage, ref, listAll, getDownloadURL } from "../firebase/Firebase";
import { ThreeCircles } from 'react-loader-spinner'
const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true)
        const listRef = ref(storage, "documents/");
        const result = await listAll(listRef);
        const filePromises = result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        });
        const fileUrls = await Promise.all(filePromises);
        setFiles(fileUrls);
      } catch (error) {
        setError("Failed to fetch files");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const openModal = (file) => {
    setSelectedFile(file);
  };

  const closeModal = () => {
    setSelectedFile(null);
  };



  return (
    <div>
      {
        loading ? <div className="flex items-center justify-center h-screen"><ThreeCircles color=" #233142"/></div>:
        <div className="min-h-screen flex flex-col items-start p-8 ">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {files.length > 0 ? (
            files.map((file, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => openModal(file)}
              >
                <img
                  src={file.url}
                  alt={file.name}
                  className="h-32 w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-white text-lg font-semibold truncate">
                    {file.name}
                  </h3>
                  <span className="text-gray-400 text-sm">
                    File Size: {Math.round(Math.random() * 5000)} KB
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-lg">No files available</div>
          )}
        </div>
      </div>

      {selectedFile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <img
              src={selectedFile.url}
              alt={selectedFile.name}
              className="w-full max-h-[500px] object-contain rounded-lg"
            />
            <button
              className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
      }

    </div>
    
  );
};

export default Dashboard;
