import { useState } from "react";
import { signIn, signUp, useSession } from "@/lib/auth";
import { Crown, Loader2 } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already authenticated
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bafo-black">
        <Loader2 className="h-8 w-8 animate-spin text-bafo-gold" />
      </div>
    );
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn.email({ email, password });
        if (error) {
          setError(error.message || "Erro ao fazer login");
        } else {
          navigate("/dashboard");
        }
      } else {
        const { error } = await signUp.email({ email, password, name });
        if (error) {
          setError(error.message || "Erro ao criar conta");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bafo-black bg-grid px-4">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-bafo-royal/10 via-bafo-black to-bafo-gold/5" />
      
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-bafo-coal/80 p-8 shadow-2xl backdrop-blur-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-bafo-gold/10 ring-1 ring-bafo-gold/30">
            <Crown className="h-6 w-6 text-bafo-gold" />
          </div>
          <h1 className="font-display text-2xl tracking-wide text-bafo-cream">
            {isLogin ? "BEM-VINDO DE VOLTA" : "CRIAR CONTA"}
          </h1>
          <p className="mt-2 text-sm text-bafo-ash">
            {isLogin
              ? "Acesse sua conta para continuar o treinamento"
              : "Junte-se ao Rei do Bafo agora mesmo"}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-bafo-red/30 bg-bafo-red/10 p-3 text-sm text-bafo-red">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-1 block text-xs font-medium text-bafo-cream/80">
                Nome completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-bafo-cream placeholder-white/20 focus:border-bafo-gold/50 focus:outline-none focus:ring-1 focus:ring-bafo-gold/50"
                placeholder="Seu nome apelão"
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs font-medium text-bafo-cream/80">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-bafo-cream placeholder-white/20 focus:border-bafo-gold/50 focus:outline-none focus:ring-1 focus:ring-bafo-gold/50"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-bafo-cream/80">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-bafo-cream placeholder-white/20 focus:border-bafo-gold/50 focus:outline-none focus:ring-1 focus:ring-bafo-gold/50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-bafo-gold to-bafo-gold-light px-4 py-3 text-sm font-bold uppercase tracking-wider text-bafo-black transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isLogin ? (
              "Entrar no jogo"
            ) : (
              "Criar minha conta"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-bafo-ash">
          {isLogin ? "Ainda não tem acesso? " : "Já tem uma conta? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="font-semibold text-bafo-gold hover:underline"
          >
            {isLogin ? "Cadastre-se" : "Faça login"}
          </button>
        </div>
      </div>
    </div>
  );
}
