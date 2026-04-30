"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2, LogIn, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "login" | "cadastro";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isLogin = mode === "login";

  const title = isLogin ? "Entrar no Sóbrio" : "Criar sua conta";
  const buttonLabel = isLogin ? "Entrar" : "Cadastrar";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (isLogin) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          dailySavings: 20,
          soberStartAt: new Date().toISOString(),
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setMessage(
      "Conta criada. Se o projeto exigir confirmação por e-mail, valide sua caixa de entrada e depois faça login.",
    );
    setLoading(false);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-8">
      <section className="rounded-2xl border border-white/10 bg-surface p-5 shadow-2xl shadow-black/30">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-widest text-neo-mint">
            Retomada
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted">
            Seu progresso comeca com uma decisao de hoje.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm text-muted">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-surface-soft px-3 py-3 text-sm outline-none ring-electric-blue/40 placeholder:text-muted/80 focus:ring-2"
              placeholder="voce@email.com"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-muted">Senha</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl border border-white/10 bg-surface-soft px-3 py-3 text-sm outline-none ring-electric-blue/40 placeholder:text-muted/80 focus:ring-2"
              placeholder="Minimo de 6 caracteres"
            />
          </label>

          {error ? (
            <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          {message ? (
            <p className="rounded-lg border border-neo-mint/30 bg-neo-mint/10 px-3 py-2 text-sm text-neo-mint">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-electric-blue px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isLogin ? (
              <LogIn className="h-4 w-4" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            {buttonLabel}
          </button>
        </form>

        <div className="mt-5 text-sm text-muted">
          {isLogin ? "Ainda nao tem conta?" : "Ja tem uma conta?"}{" "}
          <Link
            href={isLogin ? "/cadastro" : "/login"}
            className="inline-flex items-center gap-1 text-neo-mint hover:underline"
          >
            {isLogin ? "Cadastre-se" : "Entrar"}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
