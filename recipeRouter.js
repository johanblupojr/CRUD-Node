import { Router } from "express";
import recipeController from "./recipeController.js";

const recipeRouter = Router();

recipeRouter.get("/", async (req, res) => {
  const result = await recipeController.getRecipes();
  res.status(200).json(result);
});

recipeRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipeController.getRecipesById(id);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

recipeRouter.get("/food/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const result = await recipeController.getRecipesByType(type);
    console.log(result);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

recipeRouter.post("/add", async (req, res) => {
  try {
    const result = await recipeController.addRecipe(req.body);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

recipeRouter.post("/ingredients/:recipeId", async (req, res) => {
  try {
    const result = await recipeController.addIngredientsToRecipe(
      req.params.recipeId,
      req.body.name,
      req.body.quantity,
      req.body.condition
    );
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

recipeRouter.patch("/edit/:recipeId", async (req, res) => {
  try {
    const result = await recipeController.editRecipe(
      req.params.recipeId,
      req.body.name,
      req.body.type,
      req.body.instructions
    );
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

recipeRouter.patch("/editingredient/:recipeId", async (req, res) => {
  try {
    const result = await recipeController.editIngredientsByRecipe(
      req.params.recipeId,
      req.body.name,
      req.body.quantity,
      req.body.condition
    );
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

recipeRouter.delete("/removeingredient/:ingredientId", async (req, res) => {
  try {
    const result = await recipeController.removeIngredient(
      req.params.ingredientId
    );
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

recipeRouter.delete(
  "/removerecipewithingredient/:recipeId",
  async (req, res) => {
    try {
      const result = await recipeController.removeRecipeWithIngredients(
        req.params.recipeId
      );
      res.status(result.statusCode).json(result.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default recipeRouter;
