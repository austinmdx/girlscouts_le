import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LoginPage from "../screens/Login";
import HomePage from "../screens/Home";
import AuthLayout from "../components/AuthLayout";
import StyleGuide from "../screens/StyleGuide";
import GetInvolved from "../screens/GetInvolved";
import Join from "../screens/Join";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/style-guide" element={<StyleGuide />} />
      <Route path="/get-involved/:id" element={<GetInvolved />} />
      <Route path="/get-involved/:id/:childId" element={<Join />} />
    </Route>,
  ),
);

export default AppRouter;
