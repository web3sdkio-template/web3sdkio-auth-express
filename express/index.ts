import express from "express";
import { getUser, Web3sdkioAuth } from "@web3sdkio/auth/express";
import { config } from "dotenv";

config();

const app = express();
const PORT = 5000;

Web3sdkioAuth(app, {
  privateKey: process.env.ADMIN_PRIVATE_KEY || "",
  domain: "example.com",
});

app.get("/secret", (req, res) => {
  const user = getUser(req);

  if (!user) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }

  return res.status(200).json({
    message: "This is a secret... don't tell anyone.",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
