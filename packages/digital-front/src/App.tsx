import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/not-found";
import TabbarLayout from "./layouts/tabbar-layout";
import HomePage from "./pages/home";
import GoodsPage from "./pages/goods";
import ExchangePage from "./pages/exchange";
import MePage from "./pages/me";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<TabbarLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/goods" element={<GoodsPage />} />
        <Route path="/exchange" element={<ExchangePage />} />
        <Route path="/me" element={<MePage />} />
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
