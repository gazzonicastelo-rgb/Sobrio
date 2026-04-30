import {
  ChartColumn,
  Home,
  Landmark,
  LogOut,
  User,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const cleanDays = 42;
  const totalSavings = "R$ 1.250,00";
  const dailySavings = "R$ 30,00";
  const cycleLength = 30;
  const cycleDay = cleanDays % cycleLength;
  const normalizedCycleDay = cycleDay === 0 && cleanDays > 0 ? cycleLength : cycleDay;
  const cycleNumber = Math.floor(cleanDays / cycleLength) + 1;
  const daysRemaining = cycleLength - normalizedCycleDay;

  const progress = normalizedCycleDay / cycleLength;
  const size = 240;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-24 pt-7">
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
        <div className="mt-5 flex justify-center">
          <div className="relative">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="-rotate-90"
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgb(30 41 59)"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgb(59 130 246)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                fill="transparent"
              />
            </svg>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-7xl font-black leading-none text-white">{cleanDays}</p>
              <p className="mt-2 text-sm text-muted">dias sem apostar</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">
          Ciclo {cycleNumber} • Faltam {daysRemaining} dias
        </p>
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

      <nav className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md border-t border-white/10 bg-[#0a0714]/95 px-3 pb-3 pt-2 backdrop-blur">
        <ul className="grid grid-cols-4 gap-1">
          <li>
            <button
              type="button"
              className="flex w-full flex-col items-center rounded-xl bg-surface px-2 py-2 text-[11px] text-neo-mint"
            >
              <Home className="mb-1 h-4 w-4" />
              Inicio
            </button>
          </li>
          <li>
            <Link
              href="/relatorios"
              className="flex w-full flex-col items-center rounded-xl px-2 py-2 text-[11px] text-muted transition hover:bg-surface-soft hover:text-white"
            >
              <ChartColumn className="mb-1 h-4 w-4" />
              Progresso
            </Link>
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
