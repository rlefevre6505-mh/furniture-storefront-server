import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET);

const PORT = 8080;

app.listen(PORT, () => {
  console.info(`Server is running in port ${PORT}`);
});

app.get("/", (request, response) =>
  response.json({ message: "Welcome to my Stripe Sandbox server!" }),
);

app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
