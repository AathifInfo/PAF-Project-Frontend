// import { useState } from "react";
// import "./UpdateMealPlanModal.css";

// export default function UpdateMealPlanModal({ mealPlan, onSave, onClose }) {
//     const [formData, setFormData] = useState({ ...mealPlan });

//     const handleChange = (e, context = null, index = null) => {
//         if (context && index !== null) {
//             const updatedRecipes = formData.recipes.map((recipe, i) => {
//                 if (i === index) {
//                     return { ...recipe, [context]: e.target.value };
//                 }
//                 return recipe;
//             });
//             setFormData({ ...formData, recipes: updatedRecipes });
//         } else {
//             const { name, value } = e.target;
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleIngredientChange = (recipeIndex, ingredientIndex, e) => {
//         const newIngredients = formData.recipes[recipeIndex].ingredients.map((ing, i) => {
//             if (i === ingredientIndex) {
//                 return { ...ing, [e.target.name]: e.target.value };
//             }
//             return ing;
//         });
//         const newRecipes = formData.recipes.map((rec, idx) => {
//             if (idx === recipeIndex) {
//                 return { ...rec, ingredients: newIngredients };
//             }
//             return rec;
//         });
//         setFormData({ ...formData, recipes: newRecipes });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSave(formData);
//     };

//     return (
//         <div className="modal">
//             <div className="modal-content">
//                 <span className="close" onClick={onClose}>&times;</span>
//                 <h2>Edit Meal Plan</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label>
//                         Name:
//                         <input type="text" name="name" value={formData.name} onChange={handleChange} />
//                     </label>
//                     <label>
//                         Description:
//                         <textarea name="description" value={formData.description} onChange={handleChange} />
//                     </label>
//                     {formData.recipes.map((recipe, rIndex) => (
//                         <div key={rIndex}>
//                             <h3>Recipe: {recipe.name}</h3>
//                             <label>
//                                 Recipe Name:
//                                 <input type="text" value={recipe.name} onChange={(e) => handleChange(e, 'name', rIndex)} />
//                             </label>
//                             {recipe.ingredients.map((ingredient, iIndex) => (
//                                 <div key={iIndex}>
//                                     <label>Ingredient Name:
//                                         <input type="text" name="name" value={ingredient.name} onChange={(e) => handleIngredientChange(rIndex, iIndex, e)} />
//                                     </label>
//                                     <label>Quantity:
//                                         <input type="text" name="quantity" value={ingredient.quantity} onChange={(e) => handleIngredientChange(rIndex, iIndex, e)} />
//                                     </label>
//                                 </div>
//                             ))}
//                             <label>
//                                 Instructions:
//                                 <textarea name="instructions" value={recipe.instructions} onChange={(e) => handleChange(e, 'instructions', rIndex)} />
//                             </label>
//                             <label>
//                                 Photo URL:
//                                 <input type="text" name="photoUrl" value={recipe.photoUrl} onChange={(e) => handleChange(e, 'photoUrl', rIndex)} />
//                             </label>
//                             {/* Nutritional information and dietary preferences can be added similarly */}
//                         </div>
//                     ))}
//                     <button type="submit">Update Meal Plan</button>
//                 </form>
//             </div>
//         </div>
//     );
// }



import { useState } from "react";
import "./UpdateMealPlanModal.css";

export default function UpdateMealPlanModal({ mealPlan, onSave, onClose }) {
    const [formData, setFormData] = useState({ ...mealPlan });

    const handleChange = (e, context = null, index = null) => {
        const { name, value } = e.target;
        if (context && index !== null) {
            const updatedRecipes = [...formData.recipes];
            updatedRecipes[index] = {
                ...updatedRecipes[index],
                [name]: value
            };
            setFormData({ ...formData, recipes: updatedRecipes });
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddRecipe = () => {
        const newRecipe = {
            recipeId: "",
            userId: formData.userId,
            name: "",
            ingredients: [],
            instructions: "",
            photoUrl: "",
            nutrition: { calories: "", protein: "", carbs: "", fat: "" },
            portionSize: "",
            dietaryPreferences: []
        };
        setFormData(prev => ({
            ...prev,
            recipes: [...prev.recipes, newRecipe]
        }));
    };

    const handleRemoveRecipe = (index) => {
        const updatedRecipes = formData.recipes.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, recipes: updatedRecipes }));
    };

    const handleAddIngredient = (recipeIndex) => {
        const newIngredient = {
            name: "",
            quantity: ""
        };
        const updatedRecipes = [...formData.recipes];
        updatedRecipes[recipeIndex].ingredients.push(newIngredient);
        setFormData({ ...formData, recipes: updatedRecipes });
    };

    const handleRemoveIngredient = (recipeIndex, ingredientIndex) => {
        const updatedRecipes = [...formData.recipes];
        updatedRecipes[recipeIndex].ingredients = updatedRecipes[recipeIndex].ingredients.filter((_, i) => i !== ingredientIndex);
        setFormData({ ...formData, recipes: updatedRecipes });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Meal Plan</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleChange} />
                    </label>
                    {formData.recipes.map((recipe, rIndex) => (
                        <div key={rIndex}>
                            <h4>Recipe: {recipe.name}</h4>
                            <button type="button" onClick={() => handleRemoveRecipe(rIndex)}>Remove Recipe</button>
                            <label>
                                Recipe Name:
                                <input type="text" name="name" value={recipe.name} onChange={(e) => handleChange(e, null, rIndex)} />
                            </label>
                            {recipe.ingredients.map((ingredient, iIndex) => (
                                <div key={iIndex}>
                                    <label>Ingredient Name:
                                        <input type="text" name="name" value={ingredient.name} onChange={(e) => handleChange(e, 'ingredients', iIndex)} />
                                    </label>
                                    <label>Quantity:
                                        <input type="text" name="quantity" value={ingredient.quantity} onChange={(e) => handleChange(e, 'ingredients', iIndex)} />
                                    </label>
                                    <button type="button" onClick={() => handleRemoveIngredient(rIndex, iIndex)}>Remove Ingredient</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => handleAddIngredient(rIndex)}>Add Ingredient</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddRecipe}>Add Recipe</button>
                    <button type="submit">Update Meal Plan</button>
                </form>
            </div>
        </div>
    );
}
