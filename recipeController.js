import recipeModel from "./recipeModel.js";

const recipeController = {
  getRecipes: async function () {
    try {
      const recipes = await recipeModel.getRecipes();
      return { statusCode: 200, data: recipes };
    } catch (error) {
      return { statusCode: 500, data: error.message };
    }
  },

  getRecipesById: async function (recipeId) {
    try {
      const result = await recipeModel.getRecipesById(recipeId);
      if (result.length === 1) {
        return { statusCode: 200, data: result[0] };
      }
      return { statusCode: 404, data: "No recipe found with the provided ID" };
    } catch (error) {
      return { statusCode: 500, data: error.message };
    }
  },

  getRecipesByType: async function (type) {
    try {
      const recipes = await recipeModel.getRecipesByType(type);
      if (recipes.length > 0) {
        return { statusCode: 200, data: recipes };
      }
      return { statusCode: 404, data: "No recipes found for the given type" };
    } catch (error) {
      return { statusCode: 500, data: error.message };
    }
  },

  addRecipe: async function (body) {
    try {
      const result = await recipeModel.addRecipe(body);
      return { statusCode: 201, data: result[0] };
    } catch (error) {
      return { statusCode: 400, data: error.message };
    }
  },

  addIngredientsToRecipe: async function (recipeId, name, quantity, condition) {
    try {
      const result = await recipeModel.addIngredientsToRecipe(
        recipeId,
        name,
        quantity,
        condition
      );
      if (result.length === 1) {
        return { statusCode: 201, data: result[0] };
      }
      return { statusCode: 404, data: "No recipe found with the provided ID" };
    } catch (error) {
      return { statusCode: 500, data: error.message };
    }
  },

  editRecipe: async function (recipeId, name, type, instructions) {
    try {
      const result = await recipeModel.editRecipe(
        recipeId,
        name,
        type,
        instructions
      );
      if (result.length === 1) {
        return { statusCode: 200, data: result[0] };
      }
      return { statusCode: 404, data: "No recipe found with the provided ID" };
    } catch (error) {
      return { statusCode: 500, data: error.message };
    }
  },

  editIngredientsByRecipe: async function (
    recipeId,
    name,
    quantity,
    condition
  ) {
    try {
      const result = await recipeModel.editIngredientsByRecipe(
        recipeId,
        name,
        quantity,
        condition
      );
      if (result.length > 0) {
        return { statusCode: 200, data: result[0] };
      }
      return { statusCode: 404, data: "No recipe found with the provided ID" };
    } catch (error) {
      return { statusCode: 500, data: error.message };
    }
  },

  removeIngredient: async function (ingredientId) {
    try {
      const result = await recipeModel.removeIngredient(ingredientId);
      if (result.length === 1) {
        return { statusCode: 200, data: result[0] };
      }
      return {
        statusCode: 404,
        data: "No ingredient found with the provided ID",
      };
    } catch (error) {
      return { statusCode: 400, data: error.message };
    }
  },

  removeRecipeWithIngredients: async function (recipeId) {
    try {
      const result = await recipeModel.removeRecipeWithIngredients(recipeId);
      if (result.length === 1) {
        return { statusCode: 200, data: result[0] };
      }
      return { statusCode: 404, data: "No recipe found with the provided ID" };
    } catch (error) {
      return { statusCode: 400, data: error.message };
    }
  },
};

export default recipeController;
