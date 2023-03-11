const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Product from "@/models/Product";
import Order from "@/models/Order";
import { initMongoose } from "@/lib/mongoose";

export default async function handler(req, res) {
  await initMongoose();

  if (req.method !== "POST") {
    res.json("Method not allowed").send();
    return;
  }

  // getting user data
  const { email, name, address, city } = req.body;

  // getting products from request body
  const productsIds = req.body.products.split(",");
  const uniqIds = [...new Set(productsIds)];
  const products = await Product.find({ _id: { $in: uniqIds } }).exec();

  let lineItems = [];

  // counting quantity of each product
  for (let productId of uniqIds) {
    const quantity = productsIds.filter((id) => id === productId).length;
    const product = products.find(
      (product) => product._id.toString() === productId
    );
    lineItems.push({
      quantity,
      price_data: {
        currency: "usd",
        product_data: { name: product.name },
        unit_amount: product.price * 100,
      },
    });
  }

  const order = await Order.create({
    products: lineItems,
    name,
    email,
    address,
    city,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    customer_email: email,
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
    metadata: { orderId: order._id.toString() },
  });

  res.redirect(303, session.url);
}
