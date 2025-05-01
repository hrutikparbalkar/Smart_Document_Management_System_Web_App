import React, { useState, useEffect } from 'react';
import { db, functions, storage } from '../firebase/Firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { httpsCallable } from 'firebase/functions';
import './Notices.css';

const Notices = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [notices, setNotices] = useState([]);

  // Fetch notices from Firestore
  useEffect(() => {
    const fetchNotices = async () => {
      const noticeSnapshot = await getDocs(collection(db, 'notices'));
      setNotices(noticeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchNotices();
  }, []);

  // Function to handle form submission
  const handlePublish = async () => {
    if (!title || !content) {
      alert("Please enter both title and content.");
      return;
    }

    let fileUrl = '';

    // If a file is selected, upload it to Firebase Storage
    if (file) {
      try {
        const fileRef = ref(storage, `notices/${file.name}`);
        await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(fileRef);
      } catch (error) {
        console.error("File upload failed:", error);
        alert("File upload failed. Try again.");
        return;
      }
    }

    try {
      // Add the notice to Firestore
      const docRef = await addDoc(collection(db, 'notices'), {
        title,
        content,
        timestamp: serverTimestamp(),
        fileUrl
      });

      console.log("Notice added with ID:", docRef.id);

      // Call Cloud Function to send emails
      const sendEmail = httpsCallable(functions, "sendNoticeEmails");
      await sendEmail({ title, content, fileUrl });

      alert("Notice published and emails sent!");
      setTitle('');
      setContent('');
      setFile(null);
    } catch (error) {
      console.error("Error adding notice:", error);
      alert("Failed to publish notice.");
    }
  };

  return (
    <div className="notices-page">
      {/* Admin Notice Form */}
      <div className="admin-form">
        <h2>Create a New Notice</h2>
        <input type="text" placeholder="Notice Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Notice Content" value={content} onChange={(e) => setContent(e.target.value)} />

        {/* File input for attachment */}
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={handlePublish}>Publish</button>
      </div>

      {/* Notice Display Section */}
      <div className="notice-display">
        <h2>Notices</h2>

        <div className="notice-cards">
          {notices.map((notice) => (
            <div className="notice-card" key={notice.id}>
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
              <small>
                {notice.timestamp 
                  ? notice.timestamp.toDate().toLocaleString() 
                  : "No timestamp available"}
              </small>
              {notice.fileUrl && (
                <p>
                  <a href={notice.fileUrl} target="_blank" rel="noopener noreferrer">View Attachment</a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notices;
