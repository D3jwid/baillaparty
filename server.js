const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

app.post("/send", async (req, res) => {
  const { message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Bailla Party" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: "Nowa wiadomość z formularza",
      text: message
    });

    res.sendStatus(200);
  } catch (err) {
    console.error("Błąd wysyłania maila:", err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});