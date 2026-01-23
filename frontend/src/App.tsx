import { useState, useEffect } from "react";
import { RecipeList } from "./components/RecipeList";
import { DefaultLayout } from "./layouts/default";
import { recipeApi } from "./api/recipeApi";
import type { RecipeResponse } from "./api/recipeApi";

// const recipes = [
//   { id: '1', title: 'Feta Pasta', imageUrl: 'https://randomwordgenerator.com/img/picture-generator/55e1d74b4853af14f1dc8460962e33791c3ad6e04e507440712b7bd29744c3_640.jpg' },
//   { id: '2', title: 'Tostadas', imageUrl: 'https://randomwordgenerator.com/img/picture-generator/53e6d5474957b10ff3d8992cc12c30771037dbf85254794e72287fd19f4f_640.jpg' },
//   { id: '3', title: 'Avocado Toast', imageUrl: 'https://randomwordgenerator.com/img/picture-generator/53e6d5474957b10ff3d8992cc12c30771037dbf85254794e72287fd19f4f_640.jpg' },
//   { id: '4', title: 'Chicken Salad', imageUrl: 'https://randomwordgenerator.com/img/picture-generator/53e6d5474957b10ff3d8992cc12c30771037dbf85254794e72287fd19f4f_640.jpg' },
//   { id: '5', title: 'Pancakes', imageUrl: 'https://randomwordgenerator.com/img/picture-generator/53e6d5474957b10ff3d8992cc12c30771037dbf85254794e72287fd19f4f_640.jpg' },
// ];

export default function App() {

  const [recipeList, setRecipeList] = useState<RecipeResponse[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await recipeApi.list();
        setRecipeList(recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <DefaultLayout title="recipes">
      <RecipeList recipes={recipeList} />
    </DefaultLayout>
  )
}
