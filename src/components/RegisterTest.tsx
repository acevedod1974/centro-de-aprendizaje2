import React, { useState } from "react";
import { useAuthTest } from "../contexts/useAuthTest";

const RegisterTest: React.FC = () => {
  const { register, user, loading, logout } = useAuthTest();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    setSuccess(false);
    const res = await register(email, password);
    if (res.error) setError(res.error);
    else setSuccess(true);
    setPending(false);
  };

  if (loading) return <div className="py-8 text-center">Cargando...</div>;
  if (user)
    return (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8 text-center">
        <h2 className="text-xl font-bold mb-2">¡Ya tienes sesión iniciada!</h2>
        <p className="mb-4">{user.email}</p>
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
      onSubmit={handleRegister}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8"
    >
      <h2 className="text-xl font-bold mb-4">Registro (Test)</h2>
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
      {success && (
        <div className="text-green-600 mb-2">
          Registro exitoso. Revisa tu email para confirmar la cuenta.
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
        disabled={pending}
      >
        {pending ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};

export default RegisterTest;
