import React, { useEffect } from "react";
import AppRouter from "./router";
import { RouterProvider } from "react-router-dom";
import useGoogleSheets from "use-google-sheets";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [, setLinks] = useLocalStorage("links");
  const [, setCredentials] = useLocalStorage("credentials");

  const { data } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_PRIVATE_KEY,
    sheetId: process.env.REACT_APP_GOOGLE_SHEET_ID,
  });

  useEffect(() => {
    if (data && data.length) {
      const linkTab = data.find((sheet) => sheet.id === "links");
      if (linkTab) {
        setLinks(JSON.stringify(linkTab.data));
      }

      const passwordTab = data.find((sheet) => sheet.id === "password");
      if (passwordTab) {
        setCredentials(JSON.stringify(passwordTab.data));
      }
    }
  }, [data, setLinks, setCredentials]);

  return <RouterProvider router={AppRouter} />;
}

export default App;
