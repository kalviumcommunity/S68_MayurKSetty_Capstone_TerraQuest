import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

const clientId = import.meta.env.Client_Id;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>
    </GoogleOAuthProvider>
  </BrowserRouter>,
);
