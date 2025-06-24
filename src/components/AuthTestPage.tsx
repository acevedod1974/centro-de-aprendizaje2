import React from "react";
import { AuthTestProvider } from "../contexts/AuthTestContext";
import LoginTest from "./LoginTest";
import RegisterTest from "./RegisterTest";

const AuthTestPage: React.FC = () => {
  const [tab, setTab] = React.useState<"login" | "register">("login");
  return (
    <AuthTestProvider>
      <div className="max-w-lg mx-auto mt-12">
        <div className="flex justify-center mb-4 gap-2">
          <button
            className={`px-4 py-2 rounded-l-lg font-semibold ${
              tab === "login"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => setTab("login")}
          >
            Iniciar Sesión
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg font-semibold ${
              tab === "register"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => setTab("register")}
          >
            Registrarse
          </button>
        </div>
        {tab === "login" ? <LoginTest /> : <RegisterTest />}
      </div>
    </AuthTestProvider>
  );
};

export default AuthTestPage;
