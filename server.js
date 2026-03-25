import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_SECRET);

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items,
        customer_creation: "always",
      success_url: "https://furniture-storefront.onrender.com/success",
      cancel_url: "https://furniture-storefront.onrender.com/cancel",
      //       success_url: "https://furniture-storefront.onrender.com",
      // cancel_url: "https://furniture-storefront.onrender.com",
    });

console.log("Received items:", req.body.items);

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.info(`Server is running in port ${PORT}`);
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
