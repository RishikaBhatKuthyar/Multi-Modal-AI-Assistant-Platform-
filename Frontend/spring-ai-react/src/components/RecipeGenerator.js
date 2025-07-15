import React from "react";
import { useState } from "react";

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [dietaryRestriction, setDietaryRestriction] = useState('')
  const [recipe, setRecipe] = useState('')

  const generateRecipe = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/recipe?ingredients=${encodeURIComponent(ingredients)}&cuisine=${encodeURIComponent(cuisine)}&dietaryRestriction=${encodeURIComponent(dietaryRestriction)}`
      );
  
      const data = await response.text();
      console.log("Generated recipe:", data);
      setRecipe(data);
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  };

  return (
    <div className="recipe-container">
      <h2>Create a Recipe</h2>
    <div className="recipe-input-row">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients(comma-separated)"
        />
      <input
        type="text"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        placeholder="Enter cuisine"
      />
      <input
        type="text"
        value={dietaryRestriction}
        onChange={(e) => setDietaryRestriction(e.target.value)}
        placeholder="Enter dietary restrictions"
      />
    </div>

      <button onClick={generateRecipe}>Create Recipe</button>
      <div className="recipe-response">
        <p>{recipe}</p>
      </div>
    </div>
  );
}

export default RecipeGenerator;
