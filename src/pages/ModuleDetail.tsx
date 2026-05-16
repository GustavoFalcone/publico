import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Timer,
  AlertTriangle,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { findModule, getAllModulesSorted, type Quantity } from "@/data/modules";
import { getUnlockState, usePurchase } from "@/contexts/PurchaseContext";
import { Countdown } from "@/components/Countdown";
import { cn } from "@/lib/utils";

export default function ModuleDetail() {
  const { slug } = useParams();
  const mod = slug ? findModule(slug) : undefined;
  const { purchasedAt, now } = usePurchase();

  if (!mod) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bafo-black text-bafo-cream">
        <div className="text-center">
          <p className="font-display text-2xl">Módulo não encontrado.</p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block text-bafo-gold hover:underline"
          >
            Voltar para o dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { unlocked, days, hours, minutes, seconds } = getUnlockState(
    purchasedAt,
    now,
    mod.unlockAfterDays
  );

  // Próximo módulo
  const all = getAllModulesSorted();
  const idx = all.findIndex((m) => m.slug === mod.slug);
  const next = idx >= 0 && idx + 1 < all.length ? all[idx + 1] : null;
  const prev = idx > 0 ? all[idx - 1] : null;

  return (
    <div className="relative flex min-h-screen w-full bg-bafo-black">
      <Sidebar />
      <main className="flex min-h-screen flex-1 flex-col pl-[3.4rem]">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-bafo-royal/25 via-bafo-royal/5 to-transparent" />

        {/* Header navegação */}
        <header className="sticky top-0 z-30 border-b border-white/5 bg-bafo-black/70 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-bafo-ash hover:text-bafo-cream"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <div className="text-[10px] font-bold uppercase tracking-widest text-bafo-ash">
              MÓDULO {mod.number}
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          {/* Bloqueado? */}
          {!unlocked ? (
            <LockedBody
              mod={mod}
              countdown={{ days, hours, minutes, seconds }}
            />
          ) : (
            <UnlockedBody mod={mod} />
          )}

          {/* Navegação prev/next */}
          <div className="mt-12 flex flex-col items-stretch justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
            {prev ? (
              <Link
                to={`/modulo/${prev.slug}`}
                className="inline-flex items-center gap-2 text-sm text-bafo-cream/80 hover:text-bafo-gold"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>
                  <span className="block text-[10px] uppercase tracking-widest text-bafo-ash">
                    Anterior
                  </span>
                  Módulo {prev.number} · {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/modulo/${next.slug}`}
                className="inline-flex items-center gap-2 text-right text-sm text-bafo-cream/80 hover:text-bafo-gold"
              >
                <span>
                  <span className="block text-[10px] uppercase tracking-widest text-bafo-ash">
                    Próximo
                  </span>
                  Módulo {next.number} · {next.title}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function LockedBody({
  mod,
  countdown,
}: {
  mod: ReturnType<typeof findModule>;
  countdown: { days: number; hours: number; minutes: number; seconds: number };
}) {
  if (!mod) return null;
  const Icon = mod.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl rounded-2xl border border-bafo-gold/20 bg-gradient-to-b from-bafo-coal/80 to-bafo-black p-8 text-center card-noise"
    >
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-bafo-gold/30 bg-bafo-gold/10">
        <Lock className="h-7 w-7 text-bafo-gold" />
      </div>
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-bafo-gold">
        Módulo bloqueado
      </p>
      <h1 className="font-display text-3xl leading-tight text-bafo-cream sm:text-4xl">
        Módulo {mod.number} · {mod.title}
      </h1>
      <p className="mt-3 text-base text-bafo-cream/80">
        Esse módulo é mais avançado. Pra você não pular etapa e queimar o aprendizado,
        a gente libera ele em <strong className="text-bafo-gold">{mod.unlockAfterDays} dias</strong>{" "}
        a partir da sua compra.
      </p>
      <p className="mt-2 text-sm text-bafo-ash">
        Aproveita esses dias treinando os módulos liberados. Quando chegar aqui, você
        já vai estar com a base pronta pra absorver tudo.
      </p>

      <div className="mt-6 flex justify-center">
        <Countdown variant="block" {...countdown} />
      </div>

      <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/10 bg-bafo-black/60 px-3 py-1.5">
        <Icon className="h-4 w-4 text-bafo-gold" />
        <span className="text-xs text-bafo-cream/80">{mod.subtitle}</span>
      </div>

      <div className="mt-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-md bg-bafo-gold px-4 py-2 text-sm font-bold text-bafo-black hover:bg-bafo-gold-light"
        >
          Voltar e continuar treinando
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}

const QUANTITIES: Quantity[] = ["poucas", "medias", "muitas"];

function UnlockedBody({ mod }: { mod: ReturnType<typeof findModule> }) {
  const [selected, setSelected] = useState<Quantity | null>(null);

  if (!mod) return null;
  const Icon = mod.icon;

  return (
    <div>
      {/* Hero do módulo */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-bafo-coal via-bafo-coal/90 to-bafo-black p-6 sm:p-8 card-noise"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-bafo-gold/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-bafo-gold/30 bg-bafo-gold/10">
            <Icon className="h-6 w-6 text-bafo-gold" />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-display text-sm tracking-widest text-bafo-ash">
                MÓDULO {mod.number}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-bafo-lime/30 bg-bafo-lime/10 px-2 py-0.5">
                <CheckCircle2 className="h-3 w-3 text-bafo-lime" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-bafo-lime">
                  Liberado
                </span>
              </span>
              {mod.flag && (
                <span className="inline-flex items-center gap-1 rounded-full border border-bafo-lime/30 bg-bafo-lime/10 px-2 py-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-bafo-lime">
                    {mod.flag}
                  </span>
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl leading-tight tracking-wide text-bafo-cream sm:text-4xl">
              {mod.title}
            </h1>
            <p className="mt-2 text-base text-bafo-cream/85 sm:text-lg">{mod.subtitle}</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bafo-cream/75 sm:text-base">
              {mod.lead}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Seções introdutórias (3 obrigatórias antes do conteúdo prático) */}
      <section className="mt-10 space-y-6">
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-bafo-gold/10 text-xs font-bold text-bafo-gold">
            1
          </span>
          <h2 className="font-display text-xl tracking-wide text-bafo-cream">
            Antes da prática: o que você precisa entender
          </h2>
        </div>

        {(mod.intro ?? []).map((section, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="overflow-hidden rounded-2xl border border-white/5 bg-bafo-coal/60"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr,420px]">
              <div className="p-6 sm:p-7">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-bafo-gold">
                  Seção {i + 1} de {(mod.intro ?? []).length}
                </p>
                <h3 className="font-display text-2xl leading-snug text-bafo-cream">
                  {section.title}
                </h3>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-bafo-cream/85 sm:text-[15px]">
                  {section.body.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      dangerouslySetInnerHTML={{ __html: renderInline(para) }}
                    />
                  ))}
                </div>
              </div>
              {section.image && (
                <div className="relative h-56 md:h-auto">
                  <img
                    src={section.image}
                    alt={section.imageCaption || section.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-bafo-coal/60 via-transparent to-transparent md:from-bafo-coal md:via-bafo-coal/40" />
                  {section.imageCaption && (
                    <div className="absolute bottom-2 right-2 max-w-[280px] rounded-md bg-bafo-black/70 px-2.5 py-1 text-[10px] text-bafo-cream/80 backdrop-blur">
                      {section.imageCaption}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </section>

      {/* Seletor de quantidade */}
      {mod.byQuantity && (
        <section className="mt-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-bafo-gold/10 text-xs font-bold text-bafo-gold">
              2
            </span>
            <h2 className="font-display text-xl tracking-wide text-bafo-cream">
              Agora a prática: escolha a quantidade de figurinhas
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {QUANTITIES.map((q) => {
              const active = selected === q;
              const data = mod.byQuantity![q];
              return (
                <button
                  key={q}
                  onClick={() => setSelected(active ? null : q)}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border p-5 text-left transition-all",
                    active
                      ? "border-bafo-gold/60 bg-bafo-gold/10 shadow-[0_8px_30px_-12px_rgba(242,194,48,0.4)]"
                      : "border-white/10 bg-bafo-coal/60 hover:border-bafo-gold/40"
                  )}
                >
                  <div className="font-display text-2xl text-bafo-cream group-hover:text-bafo-gold">
                    {data.label}
                  </div>
                  <p className="mt-1.5 text-sm text-bafo-ash">{data.headline}</p>
                  <div
                    className={cn(
                      "mt-3 inline-flex items-center gap-1 text-xs font-bold",
                      active ? "text-bafo-gold" : "text-bafo-cream/70"
                    )}
                  >
                    {active ? "Selecionado" : "Toque para abrir"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {selected && mod.byQuantity![selected] && (
              <QuantityContent key={selected} data={mod.byQuantity![selected]} />
            )}
          </AnimatePresence>
        </section>
      )}
    </div>
  );
}

function QuantityContent({
  data,
}: {
  data: NonNullable<NonNullable<ReturnType<typeof findModule>>["byQuantity"]>[Quantity];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="mt-6 overflow-hidden rounded-2xl border border-bafo-gold/20 bg-gradient-to-br from-bafo-coal via-bafo-coal/90 to-bafo-black"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px]">
        <div className="p-6 sm:p-8">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-bafo-gold">
            Técnica personalizada
          </p>
          <h3 className="font-display text-2xl leading-snug text-bafo-cream sm:text-3xl">
            {data.headline}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-bafo-cream/85 sm:text-[15px]">
            {data.summary}
          </p>

          <div className="mt-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-bafo-gold">
              Passo a passo prático
            </p>
            <ol className="space-y-2">
              {data.steps.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-white/5 bg-bafo-black/40 p-3"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-bafo-gold text-xs font-bold text-bafo-black">
                    {i + 1}
                  </span>
                  <p className="text-sm text-bafo-cream/90">{s}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-bafo-red">
              <AlertTriangle className="h-3.5 w-3.5" /> Erros que matam o tapa
            </p>
            <ul className="space-y-2">
              {data.mistakes.map((m, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-lg border border-bafo-red/15 bg-bafo-red/5 p-3 text-sm text-bafo-cream/85"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-bafo-red" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative min-h-[260px]">
          <img
            src={data.image}
            alt={data.imageCaption}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bafo-black via-bafo-black/30 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 rounded-md bg-bafo-black/70 px-3 py-2 text-xs text-bafo-cream/80 backdrop-blur">
            {data.imageCaption}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function renderInline(text: string) {
  // suporta **negrito** simples
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-bafo-gold'>$1</strong>");
}
