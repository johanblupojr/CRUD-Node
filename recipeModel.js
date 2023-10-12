import sql from "./db.js";

const recipeModel = {
  getRecipes: function () {
    return sql`SELECT * FROM recipes;`;
  },

  getRecipesById: function (recipeId) {
    return sql`SELECT * FROM recipes WHERE recipe_id = ${recipeId};`;
  },

  getRecipesByType: function (type) {
    return sql`
      SELECT
        r.type AS recipe_type,
        i.name AS ingredient_name,
        r.instructions AS recipe_instructions
      FROM
        recipes r
      JOIN
        ingredients i ON r.recipe_id = i.recipe_id
      WHERE r.type = ${type};
    `;
  },

  addRecipe: function ({ name, type, instructions }) {
    return sql`
      INSERT INTO recipes (name, type, instructions)
      VALUES (${name}, ${type}, ${instructions})
      RETURNING recipe_id, name, type, instructions;
    `;
  },

  addIngredientsToRecipe: function (recipeId, name, quantity, condition) {
    return sql`
      INSERT INTO ingredients (recipe_id, name, quantity, condition)
      VALUES (${recipeId}, ${name}, ${quantity}, ${condition})
      RETURNING *;
    `;
  },

  editRecipe: function (recipeId, name, type, instructions) {
    return sql`
      UPDATE recipes
      SET name = ${name}, 
          type = ${type},
          instructions = ${instructions}
      WHERE recipe_id = ${recipeId}
      RETURNING *;
    `;
  },

  editIngredientsByRecipe: function (recipeId, name, quantity, condition) {
    return sql`
      UPDATE ingredients
      SET name = ${name},
          quantity = ${quantity},
          condition = ${condition}
      WHERE recipe_id = ${recipeId}
      RETURNING *;
    `;
  },

  removeIngredient: function (ingredientId) {
    return sql`
      DELETE FROM ingredients
      WHERE ingredient_id = ${ingredientId}
      RETURNING *;
    `;
  },

  removeRecipeWithIngredients: function (recipeId) {
    return sql`
      DELETE FROM recipes
      USING ingredients
      WHERE recipes.recipe_id = ingredients.recipe_id
      AND recipes.recipe_id = ${recipeId}
      RETURNING *;
    `;
  },
};

export default recipeModel;
