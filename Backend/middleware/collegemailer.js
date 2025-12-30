import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER1,
    pass: process.env.EMAIL_PASS1,
  },
});

async function sendCollegeInvite(email, college) {
  const cleanEmail = email.replace(/['"\s]/g, "").trim();

  await transporter.sendMail({
    from: `"Symbiotek Council | GENVISION 2026" <${process.env.EMAIL_USER1}>`,
    to: cleanEmail,
    subject: "Invitation for GENVISION 2026 | BSBE, IIT Bombay",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.7; color:#222">
        <p>Respected Sir/Madam,</p>

        <p>
          Greetings from the <strong>Symbiotek Council, BSBE, IIT Bombay</strong>.
        </p>

        <p>
          We are pleased to inform you that the Symbiotek Council, BSBE, IIT Bombay,
          is organizing <strong>GENVISION 2026</strong>, our annual departmental fest,
          to be held on <strong>10th and 11th January 2026</strong> at BSBE, IIT Bombay.
        </p>

        <p>
          GENVISION is a student-focused academic outreach initiative aimed at exposing
          undergraduate and postgraduate students to current research trends,
          emerging technologies, and career pathways in the biosciences.
        </p>

        <p>
          GENVISION 2026 will feature scientific talks, guided laboratory tours,
          student poster presentations, and interactive activities such as debates,
          quizzes, and a treasure hunt.
        </p>

        <p>
          In this regard, we would be honored to visit your esteemed institution,
          <strong>${college}</strong>, to personally invite your students and share
          details about the opportunities offered through GENVISION 2026.
        </p>

        <p>
          We kindly request your permission to conduct physical public outreach on
          your campus, limited to brief presentations and distribution of
          promotional material, as per your institution’s guidelines.
        </p>

        <p>
          We sincerely hope for your support and look forward to your positive response.
        </p>

        <p>
          For more information, kindly visit:<br/>
          <a href="https://www.bio.iitb.ac.in/~genvision/" target="_blank">
            https://www.bio.iitb.ac.in/~genvision/
          </a>
        </p>

        <p>
          Warm regards,<br/>
          <strong>Symbiotek Council</strong><br/>
          BSBE, IIT Bombay
        </p>
      </div>
    `,
  });

  console.log(`📨 Mail sent → ${college} | ${cleanEmail}`);
}

export default sendCollegeInvite;
