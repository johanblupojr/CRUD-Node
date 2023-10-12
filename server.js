import express from "express";
import recipeRouter from "./recipeRouter.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/recipe", recipeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
