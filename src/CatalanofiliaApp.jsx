import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";

export const CatalanofiliaApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
