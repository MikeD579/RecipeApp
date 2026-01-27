import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DefaultLayout } from "./layouts/default";
import { Recipes } from "./features/Recipes";
import { Categories } from "./features/Categories";
import { RecipeDetail } from "./features/RecipeDetail";
import { RecipeForm } from "./features/RecipeForm";
// import { RecipeEdit } from "./features/RecipeEdit";

export default function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          {/* Home displays your Recipes list */}
          <Route path="/" element={<Recipes />} />

          {/* Categories/Mealplans */}
          <Route path="/mealplans" element={<Categories />} />

          {/* Dynamic Recipe Routes */}
          <Route path="/recipe/new" element={<RecipeForm />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/recipe/:id/edit" element={<RecipeForm />} />

          {/* Catch-all: Redirect back to home if path doesn't exist */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}