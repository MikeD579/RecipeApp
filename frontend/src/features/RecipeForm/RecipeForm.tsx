import { useState, useEffect, use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, Globe, Loader2, Plus, Trash2 } from "lucide-react";
import { recipeApi, type RecipeResponse } from "../../api/recipeApi";

export function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  // Single state object for the whole recipe
  const [formData, setFormData] = useState({} as RecipeResponse);

  const handleScrape = async () => {
    setLoading(true);
    try {
      const data = await recipeApi.scrape(url);
      // "Merge" the scraped data into the form
      setFormData({ ...formData, ...data });
    } catch (err) {
      alert("Failed to scrape. You can still enter it manually!");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (id) {
      recipeApi.update(parseInt(id), formData as RecipeResponse).then(() => {
        navigate('/');
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
    if (id) {
      // Fetch existing recipe data to edit
      recipeApi.show(parseInt(id)).then((data) => {
        setFormData(data);
      }).catch(() => {
        alert("Failed to load recipe data.");
      });
    }
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
        <input
          className="text-3xl font-display w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none pb-2"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        {/* Dynamic Ingredients List */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-bold mb-3">Ingredients</h3>
          {formData.ingredients?.map((ing, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
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
            className="flex items-center gap-1 text-blue-600 font-medium text-sm mt-2"
            onClick={() => {
              const newIngs = [...(formData.ingredients || []), ''];
              setFormData({ ...formData, ingredients: newIngs });
            }}
          >
            <Plus size={16} /> Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-bold mb-3">Instructions</h3>
          {formData.instructions?.map((step, idx) => (
            <div key={idx} className="flex flex-col gap-2 mb-2 rounded-lg bg-gray-200">
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
            className="flex items-center gap-1 text-blue-600 font-medium text-sm mt-2"
            onClick={() => {
              const newSteps = [...(formData.instructions || []), ''];
              setFormData({ ...formData, instructions: newSteps });
            }}
          >
            <Plus size={16} /> Add Instruction
          </button>
        </div>
      </div>

      {/* Floating Save Button */}
      <button
        onClick={handleSave}
        className="fixed bottom-24 right-6 bg-green-600 text-white flex items-center gap-2 px-6 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
      >
        <Save size={20} /> Save Recipe
      </button>
    </div>
  );
}