import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Save, Globe, Loader2, Plus, Trash2, ChevronLeft, Clock, Users } from "lucide-react";
import { recipeApi, type RecipeResponse } from "../../api/recipeApi";
import { type CategoryResponse } from "../../api/categoryApi";

export function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  // Single state object for the whole recipe
  const [formData, setFormData] = useState({
    title: "",
    total_time: 0,
    yields: "",
    ingredients: [] as string[],
    instructions: [] as string[],
    source: "",
    Categories: []
  } as RecipeResponse);
  const [newCategory, setNewCategory] = useState("");

  const handleScrape = async () => {
    setLoading(true);
    try {
      const data = await recipeApi.scrape(url);
      // "Merge" the scraped data into the form
      setFormData({ ...formData, ...data });
    } catch {
      alert("Failed to scrape. You can still enter it manually!");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = (value: string) => {
    setNewCategory("");
    if (value.trim() === "") return;

    const existingCategories = formData.Categories || [];
    const existingNames = existingCategories.map(cat => cat.name.toLowerCase());

    if (existingNames.includes(value.trim().toLowerCase())) {
      alert("Category already exists!");
      return;
    }

    setFormData({
      ...formData,
      Categories: [...existingCategories, { name: value.trim() } as CategoryResponse]
    });
  };

  const handleSave = async () => {
    if (id) {
      recipeApi.update(parseInt(id), formData as RecipeResponse).then(() => {
        navigate('/recipe/' + id);
      }).catch(() => {
        alert("Failed to update recipe.");
      });
      return;
    }

    recipeApi.save(formData as RecipeResponse).then(() => {
      navigate('/');
    }).catch(() => {
      alert("Failed to save recipe.");
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Fetch existing recipe data to edit
      recipeApi.show(parseInt(id)).then((data) => {
        setFormData(data);
      }).catch(() => {
        alert("Failed to load recipe data.");
      });
    }
    setLoading(false);
  }, [id]);

  return (
    <div className="w-full pb-24">
      {/* SECTION: Scraper (Only show if it's a new recipe) */}
      {!id && (
        <div className="w-full bg-blue-50 p-4 rounded-2xl mb-8 border border-blue-100">
          <label className="block text-sm font-bold text-blue-900 mb-2">Import from URL</label>
          <div className="flex gap-2">
            <input
              className="w-full px-4 py-2 rounded-xl border-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://allrecipes.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              onClick={handleScrape}
              disabled={loading}
              className="bg-blue-600 text-white p-2 rounded-xl disabled:bg-blue-400"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Globe />}
            </button>
          </div>
        </div>
      )}

      {/* SECTION: The Form */}
      <div className="space-y-6">
        <div className="relative h-82 w-full mb-6 overflow-hidden rounded-3xl shadow-lg border border-dashed border-gray-500">
          {/* Navigation Header */}
          <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center gap-2 mb-3 bg-transparent p-4">
            <NavLink to={id ? `/recipe/${id}` : "/"} className="absolute left-4 top-4 flex items-center p-1 bg-gray-500 rounded-full shadow-sm text-white text-sm font-medium">
              <ChevronLeft size={24} />
            </NavLink>
            <button
              onClick={() => {
                const imageUrl = prompt("Enter image URL", formData.image || "");
                if (imageUrl !== null) {
                  setFormData({ ...formData, image: imageUrl });
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 rounded-full shadow-lg text-white text-sm font-medium"
            >
              {formData.image ? "Change Image" : "Add Image"}
            </button>
            <button
              onClick={() => setFormData({ ...formData, image: "" })}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-full shadow-lg text-white text-sm font-medium"
            >
              <Trash2 size={16} /> Remove
            </button>
          </div>
          <img
            src={formData.image}
            className="w-full h-full object-cover opacity-40"
            alt={formData.title}
          />
        </div>

        {/* Title */}
        <input
          className="text-4xl font-display w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none pb-2"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        {/* Cooking info */}
        <div className="flex gap-4 mb-8">
          <div className="flex items-center gap-1 text-gray-600 bg-white px-3 py-1 rounded-full text-sm border border-gray-100">
            <Clock size={16} />

            <input type="number"
              className="w-14 text-center bg-transparent focus:outline-none border-b border-gray-300 focus:border-blue-500"
              value={formData.total_time || ''}
              onChange={(e) => setFormData({ ...formData, total_time: parseInt(e.target.value) || 0 })}
            />

            mins
          </div>
          <div className="flex items-center gap-1 text-gray-600 bg-white px-3 py-1 rounded-full text-sm border border-gray-100">
            <Users size={16} />
            <input type="text"
              className="w-20 text-center bg-transparent focus:outline-none border-b border-gray-300 focus:border-blue-500"
              value={formData.yields || ''}
              onChange={(e) => setFormData({ ...formData, yields: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {/* Categories */}
          <div className="flex items-center mb-2">
            {
              (formData.Categories || []).length === 0 && (
                <div className="flex items-center bg-white px-3 py-1 rounded-full text-sm leading-snug shadow-sm text-gray-400 border border-gray-100">
                  No Categories Yet
                </div>
              )
            }
            {(formData.Categories && formData.Categories.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.Categories?.map((cat, idx) => (
                  <div key={idx} className="flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm leading-snug shadow-sm text-gray-700 border border-gray-300">
                    <p>{cat.name}</p>
                    <button onClick={() => {
                      const newCats = [...(formData.Categories || [])];
                      newCats.splice(idx, 1);
                      setFormData({ ...formData, Categories: newCats });
                    }}>
                      <Trash2 size={14} className="text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TODO: I need this to search existing categories
              Then create if not found. For now, it just creates a new one.
              on save it should connect the recipe to the category.
          */}
          <input
            className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none pb-2"
            placeholder="Add a Category (e.g., Dessert, Vegan)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCategory(newCategory);
              }
            }}
          />
        </div>

        {/* Dynamic Ingredients List */}
        <h3 className="text-xl font-bold mb-3">Ingredients</h3>
        {formData.ingredients?.map((ing, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <textarea
              rows={2}
              className="w-full p-2 bg-white rounded-lg border border-gray-200"
              value={ing}
              onChange={(e) => {
                const newIngs = [...(formData.ingredients || [])];
                newIngs[idx] = e.target.value;
                setFormData({ ...formData, ingredients: newIngs });
              }}
            />
            <button onClick={() => {
              const newIngs = [...(formData.ingredients || [])];
              newIngs.splice(idx, 1);
              setFormData({ ...formData, ingredients: newIngs });
            }}><Trash2 size={18} className="text-gray-400" /></button>
          </div>
        ))}
        <button
          className="w-full flex items-center justify-center gap-1 text-white font-medium text-sm mt-2 p-2 bg-gray-500 rounded-lg"
          onClick={() => {
            const newIngs = [...(formData.ingredients || []), ''];
            setFormData({ ...formData, ingredients: newIngs });
          }}
        >
          <Plus size={16} /> Add Ingredient
        </button>

        {/* Instructions */}
        <h3 className="text-xl font-bold mb-3">Instructions</h3>
        {formData.instructions?.map((step, idx) => (
          <div key={idx} className="flex flex-col gap-1 mb-4">
            <div className="flex px-2 justify-between text-gray-700 font-bold text-sm">
              <div>
                {idx + 1}
              </div>
              <button
                onClick={() => {
                  const newSteps = [...(formData.instructions || [])];
                  newSteps.splice(idx, 1);
                  setFormData({ ...formData, instructions: newSteps });
                }}
              >
                <Trash2 size={18} className="text-gray-400" />
              </button>
            </div>
            <textarea
              rows={10}
              className="w-full h-auto text-wrap p-2 bg-white rounded-lg border border-gray-200"
              value={step}
              onChange={(e) => {
                const newSteps = [...(formData.instructions || [])];
                newSteps[idx] = e.target.value;
                setFormData({ ...formData, instructions: newSteps });
              }}
            />
          </div>
        ))}
        <button
          className="w-full flex items-center justify-center gap-1 text-white font-medium text-sm mt-2 p-2 bg-gray-500 rounded-lg"
          onClick={() => {
            const newSteps = [...(formData.instructions || []), ''];
            setFormData({ ...formData, instructions: newSteps });
          }}
        >
          <Plus size={16} /> Add Instruction
        </button>
      </div>

      {/* Floating Save Button */}
      <button
        onClick={handleSave}
        className="fixed bottom-28 right-4 bg-green-700 text-white p-4 rounded-full shadow-md"
      >
        <Save size={20} />
      </button>
    </div>
  );
}