import { DefaultLayout } from "./layouts/default";
import { Home } from "./features/Home";

export default function App() {

  return (
    <DefaultLayout>
      <Home />
    </DefaultLayout>
  )
}
