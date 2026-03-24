import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items,
      success_url: "https://https://furniture-storefront.onrender.com/success",
      cancel_url: "https://https://furniture-storefront.onrender.com/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

// const stripe = new Stripe(process.env.STRIPE_SECRET);

// const PORT = 8080;

// app.listen(PORT, () => {
//   console.info(`Server is running in port ${PORT}`);
// });

// app.get("/", (request, response) =>
//   response.json({ message: "Welcome to my Stripe Sandbox server!" }),
// );

// app.post("/api/create-payment-intent", async (req, res) => {
//   try {
//     const { amount, currency } = req.body;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
