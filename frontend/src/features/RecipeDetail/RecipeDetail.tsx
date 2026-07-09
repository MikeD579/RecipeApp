import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft, Clock, Users, Edit3 } from "lucide-react";
import { recipeApi, type RecipeResponse } from "../../api/recipeApi";
import type { CategoryResponse } from "../../api/categoryApi";

export function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      await recipeApi.delete(Number(id)).then(() => {
        navigate("/");
        console.log("Recipe deleted successfully");
      }).catch((error) => {
        console.error("Error deleting recipe:", error);
      });
    }
  };

  useEffect(() => {
    // Fetch recipe from your Node backend
    recipeApi.show(Number(id)).then((data) => {
      setRecipe(data);
    });
  }, [id]);

  if (!recipe) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto pb-20">


      {/* Hero Image */}
      <div className="relative h-82 w-full mb-6 overflow-hidden rounded-3xl shadow-lg">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-3 bg-transparent p-4 absolute top-0 left-0 w-full z-10">
          <NavLink to="/" className="flex items-center p-1 bg-gray-500/90 rounded-full shadow-sm text-white text-sm font-medium">
            <ChevronLeft size={24} />
          </NavLink>
          <NavLink to={`/recipe/${id}/edit`} className="flex items-center gap-2 px-4 py-2 bg-gray-500/90 rounded-full shadow-sm text-white text-sm font-medium">
            <Edit3 size={16} /> Edit
          </NavLink>
        </div>
        <img
          src={recipe.image || 'https://via.placeholder.com/800x600?text=No+Image'}
          className="w-full h-full object-cover"
          alt={recipe.title}
        />
      </div>

      {/* Title & Metadata */}
      <h1 className="font-display text-4xl mb-4 text-gray-900">{recipe.title}</h1>

      <div className="flex gap-4 mb-2">
        <div className="flex items-center gap-1 text-gray-600 bg-white px-3 py-1 rounded-full text-sm border border-gray-100">
          <Clock size={16} /> {recipe.total_time || '--'} mins
        </div>
        <div className="flex items-center gap-1 text-gray-600 bg-white px-3 py-1 rounded-full text-sm border border-gray-100">
          <Users size={16} /> {recipe.yields || 'Variable'}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {recipe.Categories?.map((cat: CategoryResponse) => (
            <span key={cat.id} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm shadow-sm">
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Ingredients Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
        <ul className="space-y-3">
          {recipe.ingredients?.map((ing: string, i: number) => (
            <li key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100">
              <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-gray-700 leading-tight">{ing}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Instructions Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <div className="space-y-6">
          {recipe.instructions?.map((step: string, i: number) => (
            <div key={i} className="flex gap-2">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-sm">
                {i + 1}
              </span>
              <p className="text-gray-700 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Delete Button */}
      <div className="mt-16 flex justify-center">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={handleDelete}
        >
          Delete Recipe
        </button>
      </div>
    </div>
  );
}