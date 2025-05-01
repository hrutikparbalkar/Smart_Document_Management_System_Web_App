const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true }); // ✅ Add CORS middleware

admin.initializeApp();
const db = admin.firestore();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mrwhite00131@gmail.com", // Replace with your email
    pass: "zkdrxhbtdsptmutu", // Use an app password if using Gmail
  }
});

// Cloud Function with CORS enabled
exports.sendNoticeEmails = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {  // ✅ Wrap function in CORS middleware

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { title, content, fileUrl } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Missing title or content" });
    }

    try {
      // Fetch all user emails from Firestore
      const usersSnapshot = await db.collection("loginData").get();
      const emails = usersSnapshot.docs.map(doc => doc.data().email);

      if (emails.length === 0) {
        return res.status(404).json({ error: "No recipients found" });
      }

      // Email content
      const mailOptions = {
        from: "mrwhite00131@gmail.com",
        to: emails.join(","), // Send to all users
        subject: `New Notice: ${title}`,
        html: `<h2>${title}</h2><p>${content}</p>
               ${fileUrl ? `<p><a href="${fileUrl}" target="_blank">View Attachment</a></p>` : ""}`
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ success: true, message: "Emails sent successfully." });
    } catch (error) {
      console.error("Error sending emails:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

  }); // ✅ Close CORS wrapper
});
