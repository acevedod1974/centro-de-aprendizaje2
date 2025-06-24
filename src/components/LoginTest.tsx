import React, { useState } from "react";
import { useAuthTest } from "../contexts/useAuthTest";

const LoginTest: React.FC = () => {
  const { login, user, loading, logout } = useAuthTest();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await login(email, password);
    if (res.error) setError(res.error);
    setPending(false);
  };

  if (loading) return <div className="py-8 text-center">Cargando...</div>;
  if (user)
    return (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8 text-center">
        <h2 className="text-xl font-bold mb-2">¡Sesión iniciada!</h2>
        <p className="mb-4">Bienvenido, {user.email}</p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Cerrar sesión
        </button>
      </div>
    );

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8"
    >
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión (Test)</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        required
      />
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
        disabled={pending}
      >
        {pending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default LoginTest;
