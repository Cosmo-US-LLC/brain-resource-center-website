import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const PORT = Number(process.env.PAYMENTS_PORT || process.env.PORT || 3434);
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not defined. Please set it in your .env file.");
}

const stripe = new Stripe(stripeSecretKey);
const app = express();

const allowedOrigins =
  process.env.CORS_ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];
const corsOptions = {
  origin: allowedOrigins.length === 0 || allowedOrigins.includes("*") ? true : allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.post("/api/payments/create-intent", async (req, res) => {
  try {
    const { amount, currency = "usd", metadata = {} } = req.body;

    if (!amount || typeof amount !== "number" || Number.isNaN(amount)) {
      return res.status(400).json({ message: "A valid amount (in cents) is required." });
    }

    const normalizedAmount = Math.max(50, Math.trunc(amount));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: normalizedAmount,
      currency,
      description: "Brain Resource Center consultation",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata,
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Failed to create payment intent:", error);
    return res.status(500).json({ message: "Unable to create payment intent.", error: error.message });
  }
});

app.use((err, _req, res) => {
  console.error("Unhandled server error:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Payment server running on port ${PORT}`);
});
