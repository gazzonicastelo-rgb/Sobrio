import { Landmark, LogOut, Wallet } from "lucide-react";

export default function DashboardPage() {
  const cleanDays = 42;
  const totalSavings = "R$ 1.250,00";
  const dailySavings = "R$ 30,00";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-7">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neo-mint">
            Dashboard
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Bem-vindo de volta
          </h1>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface-soft px-3 py-2 text-sm font-medium text-muted transition hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </header>

      <section className="mb-5 rounded-3xl border border-white/10 bg-gradient-to-br from-surface to-surface-soft px-6 py-8 text-center shadow-xl shadow-black/30">
        <p className="text-xs uppercase tracking-[0.2em] text-neo-mint">
          Contador de dias limpos
        </p>
        <p className="mt-4 text-7xl font-black leading-none text-white">
          {cleanDays}
        </p>
        <p className="mt-2 text-base text-muted">dias sem apostar</p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <article className="rounded-2xl border border-white/10 bg-surface p-4">
          <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-neo-mint/15 text-neo-mint">
            <Landmark className="h-5 w-5" />
          </div>
          <p className="text-xs text-muted">Economia Total</p>
          <p className="mt-1 text-xl font-bold text-white">{totalSavings}</p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-surface p-4">
          <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-electric-blue/20 text-electric-blue">
            <Wallet className="h-5 w-5" />
          </div>
          <p className="text-xs text-muted">Economia Diaria</p>
          <p className="mt-1 text-xl font-bold text-white">{dailySavings}</p>
        </article>
      </section>
    </main>
  );
}
