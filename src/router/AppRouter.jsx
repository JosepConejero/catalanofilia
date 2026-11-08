import { Navigate, Route, Routes } from "react-router-dom";
import { MainCatalanofiliaPage } from "../pages/MainCatalanofiliaPage";
import { OtherInfoPage } from "../pages/OtherInfoPage";
import { PrgLinksPage } from "../pages/PrgLinksPage";
import { WeatherLinksPage } from "../pages/WeatherLinksPage";
import { CatalaLinksPage } from "../pages/CatalaLinksPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainCatalanofiliaPage />} />
        <Route path="/other-info" element={<OtherInfoPage />} />
        <Route path="/prg-links" element={<PrgLinksPage />} />
        <Route path="/catala-links" element={<CatalaLinksPage />} />
        <Route path="/weather-links" element={<WeatherLinksPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
