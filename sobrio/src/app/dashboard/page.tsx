import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

const NUDGES = [
  "Um dia de cada vez: disciplina hoje, liberdade amanha.",
  "Seu foco esta construindo um futuro que a aposta nao entrega.",
  "Respira fundo. Vontade passa. Seu compromisso fica.",
  "Toda recaida evitada e dinheiro e paz preservados.",
  "Voce nao precisa apostar para sentir adrenalina: viva sua evolucao.",
  "Cada 24 horas conta. Hoje voce escolheu vencer.",
];

function getDaysSober(startAt: string | null) {
  if (!startAt) return 0;
  const start = new Date(startAt);
  if (Number.isNaN(start.getTime())) return 0;
  const diff = Date.now() - start.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const soberStartAt =
    typeof user.user_metadata?.soberStartAt === "string"
      ? user.user_metadata.soberStartAt
      : user.created_at;

  const dailySavings =
    typeof user.user_metadata?.dailySavings === "number"
      ? user.user_metadata.dailySavings
      : 20;

  const soberDays = getDaysSober(soberStartAt);
  const totalSavings = soberDays * dailySavings;
  const cycleDays = 30;
  const cycleProgress = (soberDays % cycleDays) / cycleDays;
  const nudgeOfTheDay = NUDGES[soberDays % NUDGES.length];
  const totalSavingsFormatted = formatCurrency(totalSavings);

  return (
    <DashboardShell
      email={user.email ?? "usuario@sobrio.app"}
      soberDays={soberDays}
      cycleDays={cycleDays}
      cycleProgress={cycleProgress}
      totalSavings={totalSavingsFormatted}
      dailySavings={dailySavings}
      nudge={nudgeOfTheDay}
    />
  );
}
