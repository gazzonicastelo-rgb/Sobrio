import {
  ChartColumn,
  Gem,
  Home,
  ShieldCheck,
  Trophy,
  User,
  Users,
} from "lucide-react";

const streakDays = [
  1, 1, 0, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1,
  1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 1,
];

const todayIndex = 32;

const badges = [
  { title: "1 Semana Invicto", icon: ShieldCheck, tone: "text-neo-mint" },
  { title: "Meta de 30 Dias", icon: Trophy, tone: "text-electric-blue" },
  { title: "Disciplina de Aco", icon: Gem, tone: "text-neo-mint" },
];

export default function RelatoriosPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-24 pt-7">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-neo-mint">Relatorios</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          Seu Progresso
        </h1>
      </header>

      <section className="mb-4 rounded-3xl border border-white/10 bg-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Calendario de Constancia</h2>
          <span className="rounded-full bg-surface-soft px-3 py-1 text-[11px] text-muted">
            Dia atual marcado
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {streakDays.map((hit, index) => {
            const isToday = index === todayIndex;
            const done = hit === 1;
            return (
              <div
                key={`streak-day-${index}`}
                className={`h-8 rounded-md border ${
                  done
                    ? "border-emerald-400/40 bg-emerald-500/80"
                    : "border-slate-700 bg-slate-800"
                } ${isToday ? "ring-2 ring-electric-blue ring-offset-2 ring-offset-background" : ""}`}
              />
            );
          })}
        </div>

        <p className="mt-3 text-xs text-muted">
          Verde indica dias limpos cumpridos. O anel azul destaca hoje.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-3 text-sm font-semibold text-white">Evolucao Financeira</h2>
        <div className="grid grid-cols-2 gap-3">
          <article className="rounded-2xl border border-white/10 bg-surface p-4">
            <p className="text-xs text-muted">Economia este Mes</p>
            <p className="mt-2 text-2xl font-bold text-white">R$ 900,00</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-surface p-4">
            <p className="text-xs text-muted">Projecao em 1 Ano</p>
            <p className="mt-2 text-2xl font-bold text-white">R$ 10.800,00</p>
          </article>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-3 text-sm font-semibold text-white">Conquistas</h2>
        <div className="space-y-2">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <article
                key={badge.title}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-surface p-3"
              >
                <div className="rounded-lg bg-surface-soft p-2">
                  <Icon className={`h-5 w-5 ${badge.tone}`} />
                </div>
                <p className="text-sm font-medium text-white">{badge.title}</p>
              </article>
            );
          })}
        </div>
      </section>

      <nav className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md border-t border-white/10 bg-[#0a0714]/95 px-3 pb-3 pt-2 backdrop-blur">
        <ul className="grid grid-cols-4 gap-1">
          <li>
            <button
              type="button"
              className="flex w-full flex-col items-center rounded-xl px-2 py-2 text-[11px] text-muted transition hover:bg-surface-soft hover:text-white"
            >
              <Home className="mb-1 h-4 w-4" />
              Inicio
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flex w-full flex-col items-center rounded-xl bg-surface px-2 py-2 text-[11px] text-neo-mint"
            >
              <ChartColumn className="mb-1 h-4 w-4" />
              Relatorios
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flex w-full flex-col items-center rounded-xl px-2 py-2 text-[11px] text-muted transition hover:bg-surface-soft hover:text-white"
            >
              <Users className="mb-1 h-4 w-4" />
              Comunidade
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flex w-full flex-col items-center rounded-xl px-2 py-2 text-[11px] text-muted transition hover:bg-surface-soft hover:text-white"
            >
              <User className="mb-1 h-4 w-4" />
              Perfil
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
}
