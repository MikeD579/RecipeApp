import { useState, useEffect } from "react";
import { recipeApi, type RecipeResponse } from "../../api/recipeApi";
import { CookingPot, CalendarDays, LayoutList } from "lucide-react";
import { HorizontalList } from "../../components/Base/HorizontalList";
import { CategoryHorizontalListCard } from "../../components/Category/CategoryHorizontalListCard";
import { RecipeHorizontalListCard } from "../../components/Recipe/RecipeHorizontalListCard";
import { categoryApi, type CategoryResponse } from "../../api/categoryApi";
import { Loading } from "../../components/Base/Loading";
import { RecipeCreateEditModal } from "../../components/Recipe/RecipeCreateEditModal";

type Page = "home" | "recipes" | "categories";

interface Props {
  setCurrentPage: (page: Page) => void;
}

export const Home = ({ setCurrentPage }: Props) => {

  const [categoryList, setCategoryList] = useState<CategoryResponse[]>([]);
  const [recipeList, setRecipeList] = useState<RecipeResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isCreateRecipeModalOpen, setIsCreateRecipeModalOpen] = useState(false);

  const openCreateRecipeModal = () => {
    setIsCreateRecipeModalOpen(true);
  };

  const openCreateCategoryModal = () => {
    // Logic to open the create category modal
  };

  const openPlanWeekModal = () => {
    // Logic to open the plan week modal
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const categories = await categoryApi.list();
        setCategoryList(categories);

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
        <div className='flex flex-col items-center gap-1' onClick={() => { openCreateCategoryModal() }}>
          <div className='border border-1 border-gray-400 rounded-lg w-20 h-20 p-2 antialiased flex items-center justify-center'>
            <LayoutList size={48} className="mx-auto text-gray-600" />
          </div>
          <div className='text-gray-800 text-center'>add category</div>
        </div>
        <div className='flex flex-col items-center gap-1' onClick={() => { openCreateRecipeModal() }}>
          <div className='border border-1 border-gray-400 rounded-lg w-20 h-20 p-2 antialiased flex items-center justify-center'>
            <CookingPot size={48} className="mx-auto text-gray-600" />
          </div>
          <div className='text-gray-800 text-center'>add recipe</div>
        </div>
        <div className='flex flex-col items-center gap-1' onClick={() => { openPlanWeekModal() }}>
          <div className='border border-1 border-gray-400 rounded-lg w-20 h-20 p-2 antialiased flex items-center justify-center'>
            <CalendarDays size={48} className="mx-auto text-gray-600" />
          </div>
          <div className='text-gray-800 text-center'>plan your week</div>
        </div>
      </div>
      <HorizontalList
        title="Categories"
        height="h-24"
        onMore={() => { setCurrentPage("categories") }}
      >
        <CategoryHorizontalListCard
          items={categoryList}
          height="h-24"
        />
        {isLoading && <Loading />}
      </HorizontalList>
      <div className="mb-6"></div>
      <HorizontalList
        title="Recipes"
        height="h-48"
        onMore={() => { setCurrentPage("recipes") }}
      >
        <RecipeHorizontalListCard
          items={recipeList}
          height="h-48"
        />
        {isLoading && <Loading />}
      </HorizontalList>

      <RecipeCreateEditModal
        isOpen={isCreateRecipeModalOpen}
        onClose={() => setIsCreateRecipeModalOpen(false)}
      />
    </div>
  )
}