import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase/Firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import swal from "sweetalert";
import "./Notices.css";

const Notices = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [notices, setNotices] = useState([]);

  // Fetch notices from Firestore
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const noticeSnapshot = await getDocs(collection(db, "notices"));
        setNotices(noticeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };
    fetchNotices();
  }, []);

  // Function to handle form submission
  const handlePublish = async () => {
    if (!title || !content) {
      swal({ text: "Please enter both title and content.", icon: "warning" });
      return;
    }

    let fileUrl = "";

    // Upload file if selected
    if (file) {
      try {
        const fileRef = ref(storage, `notices/${file.name}`);
        await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(fileRef);
      } catch (error) {
        console.error("File upload failed:", error);
        swal({ text: "File upload failed. Try again.", icon: "error" });
        return;
      }
    }

    try {
      // Add the notice to Firestore
      const docRef = await addDoc(collection(db, "notices"), {
        title,
        content,
        timestamp: serverTimestamp(),
        fileUrl
      });

      console.log("Notice added with ID:", docRef.id);

      // Call the Cloud Function to send emails
      await fetch("https://sendnoticeemails-ym3gnjxfsa-uc.a.run.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, fileUrl })
      });

      swal({ text: "Notice published and emails sent!", icon: "success" });
      setTitle("");
      setContent("");
      setFile(null);
    } catch (error) {
      console.error("Error adding notice:", error);
      swal({ text: "Failed to publish notice.", icon: "error" });
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
                  ? new Date(notice.timestamp.seconds * 1000).toLocaleString()
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
