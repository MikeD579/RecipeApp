import { useState, useEffect } from "react";
import { recipeApi } from "../../api/recipeApi";
import type { RecipeResponse } from "../../api/recipeApi";
import { CookingPot, FileCode, LayoutList } from "lucide-react";
import { RecipeList } from "../../components/Recipe/RecipeList";
import { HorizontalList } from "../../components/Base/HorizontalList";

// interface Props {
//   isLoading: boolean;
//   setIsModalOpen: (isOpen: boolean) => void;
// }

export const Home = () => {

  const [recipeList, setRecipeList] = useState<RecipeResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const recipes = await recipeApi.list();
        setRecipeList(recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="w-full">
      <div>
        <div><h1 className="text-5xl font-extrabold italic mt-16 mb-2 text-gray-800">Home</h1></div>
        <div className="border-b border-gray-300 mb-6 h-1 w-full"></div>
      </div>
      <div className='grid grid-cols-3 items-start justify-center mb-6 gap-4'>
        <div className='flex flex-col items-center gap-1'>
          <div className='border border-1 border-gray-400 rounded-lg w-20 h-20 p-2 antialiased flex items-center justify-center'>
            <LayoutList size={48} className="mx-auto text-gray-600" />
          </div>
          <div className='text-gray-800 text-center'>add category</div>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <div className='border border-1 border-gray-400 rounded-lg w-20 h-20 p-2 antialiased flex items-center justify-center'>
            <CookingPot size={48} className="mx-auto text-gray-600" />
          </div>
          <div className='text-gray-800'>add recipe</div>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <div className='border border-1 border-gray-400 rounded-lg w-20 h-20 p-2 antialiased flex items-center justify-center'>
            <FileCode size={48} className="mx-auto text-gray-600" />
          </div>
          <div className='text-gray-800'>scrape url</div>
        </div>
      </div>
      <HorizontalList
        title="Categories"
        height="h-24"
        onMore={() => { }}
      >
        <div className="absolute -left-6 max-w-screen pl-6 flex items-center overflow-x-scroll scrollbar-hidden">
          {recipeList.map((item, index) => (
            <div key={index} className="mr-4">
              <div className="border w-48 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </HorizontalList>
      <div className="mb-6"></div>
      <HorizontalList
        title="Recipes"
        height="h-32"
        onMore={() => { }}
      >
        <div className="absolute -left-6 max-w-screen pl-6 flex items-center overflow-x-scroll scrollbar-hidden">
          {recipeList.map((item, index) => (
            <div key={index} className="mr-4">
              <div className="border w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </HorizontalList>

      {/* recipe list */}
      <RecipeList recipes={recipeList} isLoading={isLoading} />
    </div>
  )
}