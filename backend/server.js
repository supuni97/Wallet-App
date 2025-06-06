import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log("Hey we hit a req, the method is", req.method);
  next();
});

const PORT = process.env.PORT || 5001;

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Database initializing fail", error);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.send("It's working");
});

app.post("/api/transactions", async (req, res) => {
  try {
    const { title, amount, user_id, category } = req.body;

    if (!title || !user_id || !category || amount === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [transaction] = await sql`
      INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
    `;

    res.status(201).json({ message: "Transaction created", data: transaction });
  } catch (error) {
    console.log("Error creating the transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//console.log(process.env.PORT);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT:", PORT);
  });
});
