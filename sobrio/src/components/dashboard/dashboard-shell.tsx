"use client";

import { useMemo, useState } from "react";
import {
  BookOpenText,
  ChartColumn,
  Flame,
  Home,
  PiggyBank,
  RotateCcw,
  Save,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import {
  resetCycleAction,
  signOutAction,
  updateDailySavingsAction,
} from "@/app/dashboard/actions";

type TabId = "inicio" | "progresso" | "comunidade" | "perfil";

type DashboardShellProps = {
  email: string;
  soberDays: number;
  cycleDays: number;
  cycleProgress: number;
  totalSavings: string;
  dailySavings: number;
  nudge: string;
};

const tabs: Array<{ id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "progresso", label: "Progresso", icon: ChartColumn },
  { id: "comunidade", label: "Comunidade", icon: Users },
  { id: "perfil", label: "Perfil", icon: User },
];

export function DashboardShell({
  email,
  soberDays,
  cycleDays,
  cycleProgress,
  totalSavings,
  dailySavings,
  nudge,
}: DashboardShellProps) {
  const [activeTab, setActiveTab] = useState<TabId>("inicio");
  const [value, setValue] = useState(dailySavings.toString());

  const circleSize = 208;
  const strokeWidth = 9;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - cycleProgress);

  const avatarLabel = useMemo(() => {
    const left = email.split("@")[0] ?? "S";
    return left.slice(0, 2).toUpperCase();
  }, [email]);

  function handleResetClick(event: React.MouseEvent<HTMLButtonElement>) {
    const confirmed = window.confirm(
      "Tem certeza que deseja reiniciar o ciclo? Seu contador voltara para zero.",
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background px-5 pb-24 pt-6">
      <header className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Sobrio</h1>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-surface-soft text-xs font-semibold text-neo-mint">
          {avatarLabel}
        </div>
      </header>

      {activeTab === "inicio" ? (
        <section className="space-y-4">
          <article className="rounded-3xl border border-white/10 bg-surface p-5">
            <div className="mb-3 flex items-center justify-center gap-2 text-neo-mint">
              <Flame className="h-4.5 w-4.5" />
              <span className="text-[11px] uppercase tracking-widest">
                Contador central
              </span>
            </div>
            <div className="mx-auto flex w-full justify-center">
              <div className="relative">
                <svg
                  width={circleSize}
                  height={circleSize}
                  viewBox={`0 0 ${circleSize} ${circleSize}`}
                  className="-rotate-90"
                >
                  <circle
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    r={radius}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                  <circle
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    r={radius}
                    stroke="var(--neo-mint)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    fill="transparent"
                  />
                </svg>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="text-5xl font-bold leading-none text-white">{soberDays}</p>
                  <p className="mt-1 text-sm text-muted">dias sobrio</p>
                  <p className="mt-2 text-[11px] uppercase tracking-wider text-neo-mint">
                    ciclo {soberDays % cycleDays}/{cycleDays}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-surface p-5">
            <div className="flex items-center gap-2 text-electric-blue">
              <PiggyBank className="h-5 w-5" />
              <h2 className="text-sm font-semibold">Economia total</h2>
            </div>
            <p className="mt-3 text-3xl font-semibold text-white">{totalSavings}</p>
            <p className="mt-1 text-xs text-muted">Com base no seu gasto diario atual.</p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-surface p-5">
            <div className="flex items-center gap-2 text-neo-mint">
              <Sparkles className="h-5 w-5" />
              <h2 className="text-sm font-semibold">Nudge diario</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{nudge}</p>
          </article>

          <section className="grid grid-cols-3 gap-3">
            <button
              type="button"
              className="rounded-2xl border border-white/10 bg-surface p-3 text-left"
            >
              <BookOpenText className="mb-2 h-5 w-5 text-neo-mint" />
              <p className="text-xs font-medium text-white">Diario</p>
            </button>
            <button
              type="button"
              className="rounded-2xl border border-white/10 bg-surface p-3 text-left"
            >
              <Flame className="mb-2 h-5 w-5 text-electric-blue" />
              <p className="text-xs font-medium text-white">Registrar Impulso</p>
            </button>
            <button
              type="button"
              className="rounded-2xl border border-white/10 bg-surface p-3 text-left"
            >
              <ChartColumn className="mb-2 h-5 w-5 text-neo-mint" />
              <p className="text-xs font-medium text-white">Estatisticas</p>
            </button>
          </section>
        </section>
      ) : null}

      {activeTab === "progresso" ? (
        <section className="rounded-3xl border border-white/10 bg-surface p-5">
          <h2 className="text-sm font-semibold text-neo-mint">Progresso</h2>
          <p className="mt-2 text-sm text-muted">
            Em breve, essa aba exibira historico detalhado e metas de longo prazo.
          </p>
        </section>
      ) : null}

      {activeTab === "comunidade" ? (
        <section className="rounded-3xl border border-white/10 bg-surface p-5">
          <h2 className="text-sm font-semibold text-neo-mint">Comunidade</h2>
          <p className="mt-2 text-sm text-muted">
            Em breve, aqui voce encontrara apoio coletivo e relatos de superacao.
          </p>
        </section>
      ) : null}

      {activeTab === "perfil" ? (
        <section className="space-y-4">
          <article className="rounded-3xl border border-white/10 bg-surface p-5">
            <h2 className="text-sm font-semibold text-electric-blue">Gasto diario</h2>
            <p className="mt-1 text-xs text-muted">
              Esse valor define o calculo da sua economia total.
            </p>
            <form action={updateDailySavingsAction} className="mt-4 flex gap-2">
              <div className="flex flex-1 items-center rounded-xl border border-white/10 bg-surface-soft px-3">
                <span className="text-sm text-muted">R$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  name="dailySavings"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  className="w-full bg-transparent px-2 py-3 text-sm text-white outline-none"
                  placeholder="0,00"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-electric-blue px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <Save className="h-4 w-4" />
                Salvar
              </button>
            </form>
          </article>

          <article className="rounded-3xl border border-red-400/20 bg-surface p-5">
            <h2 className="text-sm font-semibold text-red-200">Recaida</h2>
            <p className="mt-1 text-xs text-muted">
              Reinicia sua contagem e o ciclo de progresso.
            </p>
            <form action={resetCycleAction} className="mt-4">
              <button
                type="submit"
                onClick={handleResetClick}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-500/20"
              >
                <RotateCcw className="h-4 w-4" />
                Reiniciar ciclo
              </button>
            </form>
          </article>

          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full rounded-xl border border-white/10 bg-surface-soft px-4 py-3 text-sm font-medium text-muted transition hover:text-white"
            >
              Sair da conta
            </button>
          </form>
        </section>
      ) : null}

      <nav className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md border-t border-white/10 bg-[#0a0714]/95 px-3 pb-3 pt-2 backdrop-blur">
        <ul className="grid grid-cols-4 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full flex-col items-center rounded-xl px-2 py-2 text-[11px] transition ${
                    active
                      ? "bg-surface text-neo-mint"
                      : "text-muted hover:bg-surface-soft hover:text-white"
                  }`}
                >
                  <Icon className="mb-1 h-4 w-4" />
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </main>
  );
}
