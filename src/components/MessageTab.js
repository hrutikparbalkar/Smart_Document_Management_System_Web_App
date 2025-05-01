// src/components/MessageTab.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { db } from './firebase/Firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

const MessageTab = ({ currentUser }) => {
  const { recipientUserId,recipientName  } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typingStatus, setTypingStatus] = useState('');
  const [file, setFile] = useState(null);
  const [fileLink, setFileLink] = useState('');
  console.log(currentUser);

  useEffect(() => {
    if (currentUser && recipientUserId) {
        const chatId = [currentUser, recipientUserId].sort().join('_'); // Ensure chat ID is same for both users
        const messagesRef = collection(db, 'chats', chatId, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }
}, [currentUser, recipientUserId]);


const sendMessage = async (e) => {
  e.preventDefault();
  if (newMessage.trim() || file) {
      const chatId = [currentUser, recipientUserId].sort().join('_'); // Unique chat ID for both users
      const messagesRef = collection(db, 'chats', chatId, 'messages');

      const messageData = {
          sender: currentUser, // Sender's ID
          recipient: recipientUserId, // Recipient's ID
          message: newMessage,
          file: fileLink || '', // Save file link if uploaded
          timestamp: serverTimestamp(),
      };

      await addDoc(messagesRef, messageData);

      setNewMessage('');
      setFile(null);
      setFileLink('');
  }
};
console.log("Current User:", currentUser);
console.log("Recipient User ID:", recipientUserId);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setFileLink(fileURL); // Set the file URL to display as a link
    }
  };

  const styles = {
    chatContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '80vh',
      maxWidth: '400px',
      margin: '0 auto',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    },
    header: {
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      borderRadius: '8px 8px 0 0',
    },
    messagesContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      overflowY: 'auto',
      flexGrow: 1,
    },
    message: {
      padding: '8px 12px',
      margin: '5px 0',
      borderRadius: '12px',
      maxWidth: '75%',
      fontSize: '14px',
      position: 'relative',
    },
    inputForm: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderTop: '1px solid #ddd',
    },
    input: {
      flexGrow: 1,
      padding: '8px',
      borderRadius: '20px',
      border: '1px solid #ddd',
      marginRight: '10px',
      outline: 'none',
    },
    fileInputLabel: {
      marginRight: '10px',
      fontSize: '20px',
      cursor: 'pointer',
    },
    fileInput: {
      display: 'none',
    },
    sendButton: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    fileLink: {
      color: '#007bff',
      marginTop: '5px',
      display: 'block',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.header}>
  Chat with {recipientName || "Unknown"}
</div>

      <div style={styles.messagesContainer}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ 
              ...styles.message, 
              backgroundColor: msg.sender === currentUser ? '#007bff' : '#e9e9e9', 
              color: msg.sender === currentUser ? '#fff' : '#000' 
          }}>
            <strong>{msg.sender === currentUser ? 'You' : recipientName}:</strong>
            <p>{msg.message}</p>
            {msg.file && <a href={msg.file} target="_blank" rel="noopener noreferrer" style={styles.fileLink}>View Attachment</a>}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={styles.inputForm}>
        <input
          type="file"
          id="fileInput"
          accept="*"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        <label htmlFor="fileInput" style={styles.fileInputLabel}>📎</label>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" style={styles.sendButton}>Send</button>
      </form>
      {typingStatus && <p className="typing-status">{typingStatus}</p>}
</div>

  );
};

export default MessageTab;
