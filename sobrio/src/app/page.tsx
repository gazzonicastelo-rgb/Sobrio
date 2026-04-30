import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-soft px-3 py-1">
          <ShieldCheck className="h-4 w-4 text-neo-mint" />
          <span className="text-xs text-muted">PWA em construção</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Sóbrio</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Base do projeto pronta com Next.js, Tailwind e tema dark moderno.
        </p>
      </header>

      <section className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-surface p-5">
          <p className="text-xs uppercase tracking-widest text-neo-mint">
            Próximos blocos
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Login e cadastro com Supabase Auth</li>
            <li>Dashboard com contador de dias</li>
            <li>Cards de economia total e nudge diário</li>
          </ul>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-electric-blue px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Continuar configuração
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </main>
  );
}
