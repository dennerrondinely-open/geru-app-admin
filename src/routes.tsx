import { Route, Routes as Switch } from "react-router";
import { Home } from "./pages/Home";
import { CreateSection } from "./pages/CreateSection";
import { EditSection } from "pages/EditSection";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/section" element={<CreateSection />} />
      <Route path="/section/:id" element={<EditSection />} />
    </Switch>
  );
};
