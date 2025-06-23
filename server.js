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
    const { name, lastname, ig, phone, mail } = req.body;

    console.log("Dane z formularza:", req.body); // ← to dodaj!

    const emailText = `
  Nowe zgłoszenie Bailla Party:
  
  👤 Imię: ${name}
  👤 Nazwisko: ${lastname}
  📸 Instagram: ${ig || "nie podano"}
  📞 Telefon: ${phone || "nie podano"}
  📧 E-mail: ${mail}
  
  Wyślij bilet z kodem QR na meila!
    `;

    try {
        await transporter.sendMail({
            from: `"Bailla Party" <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_TO,
            subject: "NOWY BILET!!!",
            text: emailText
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