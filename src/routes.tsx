import { Route, Routes as Switch } from "react-router";
import { Home } from "./pages/Home";
import { Sections } from "./pages/Sections";
import { CreateSection } from "./pages/CreateSection";
import { EditSection } from "pages/EditSection";
import { Links } from "pages/Links";
import { EditLink } from "pages/EditLink";
import { RedirectPage } from "pages/RedirectPage";
import { NotFoundPage } from "pages/NotFoundPage";

/** Rotas públicas — sem autenticação, sem AppLayout */
export const PublicRoutes = () => (
  <Switch>
    <Route path="/go/:id" element={<RedirectPage />} />
    <Route path="/not-found" element={<NotFoundPage />} />
  </Switch>
);

/** Rotas privadas — dentro do AuthProvider + AppLayout */
export const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/sections" element={<Sections />} />
      <Route path="/section" element={<CreateSection />} />
      <Route path="/section/:id" element={<EditSection />} />
      <Route path="/links" element={<Links />} />
      <Route path="/link/:id" element={<EditLink />} />
    </Switch>
  );
};
