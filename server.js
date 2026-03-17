import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());

// app.listen(3000, function () {
//   console.log("Server is listening on port 3000");
// });

// app.get("/messages", function (request, response) {
//   response.json({ message: "Hello, World!" });
// });

app.get("/create-checkout-session", async function () {
  const stripe = require("stripe")(process.env.STRIPE_SECRET);

  const session = await stripe.checkout.sessions.create({
    ui_mode: "custom",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // return_url: "https://example.com/return?session_id={CHECKOUT_SESSION_ID}",
    return_url: "localhost:5173",
  });
});
