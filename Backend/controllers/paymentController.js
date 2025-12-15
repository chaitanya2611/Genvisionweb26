// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Participant from "../models/Participant.js";
// import nodemailer from "nodemailer";

// const instance = new Razorpay({
//   key_id: process.env.RZP_KEY,
//   key_secret: process.env.RZP_SECRET,
// });

// // simple mailer
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const createOrder = async (req, res) => {
//   try {
//     const amount = 500 * 100; // ₹500 -> paisa
//     const options = {
//       amount,
//       currency: "INR",
//       receipt: `rcpt_${Date.now()}`,
//     };
//     const order = await instance.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Please Try Again" });
//   }
// };

// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData } = req.body;

//     const generated_signature = crypto
//       .createHmac("sha256", process.env.RZP_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");

//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     // success -> save participant
//     const participant = await Participant.create({
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       event: formData.event || "General",
//       paymentId: razorpay_payment_id,
//       orderId: razorpay_order_id,
//       status: "paid",
//       amount: 500
//     });

//     // send confirmation email (optional but pro)
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: participant.email,
//       subject: "GenVision Registration Confirmed",
//       text: `Hi ${participant.name},\n\nYour registration is confirmed. Payment ID: ${participant.paymentId}\nEvent: ${participant.event}\nAmount: ₹500\n\nThanks,\nGenVision Team`
//     };

//     transporter.sendMail(mailOptions).catch(err => console.warn("Mail send failed:", err));

//     res.json({ success: true, participant });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Verification failed" });
//   }
// };