import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllModulesSorted, crossells, type BafoModule } from "@/data/modules";
import { getUnlockState, usePurchase } from "@/contexts/PurchaseContext";
import { Countdown } from "./Countdown";
import { Badge } from "@/components/ui/badge";

function ModuleCard({ mod, index }: { mod: BafoModule; index: number }) {
  const { purchasedAt, now } = usePurchase();
  const { unlocked, days, hours, minutes, seconds } = getUnlockState(
    purchasedAt,
    now,
    mod.unlockAfterDays
  );
  const Icon = mod.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/modulo/${mod.slug}`}
        className={cn(
          "group relative block overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-bafo-coal via-bafo-coal/95 to-bafo-black p-5 transition-all",
          "hover:border-bafo-gold/40 hover:shadow-[0_8px_30px_-12px_rgba(242,194,48,0.25)]",
          !unlocked && "opacity-95"
        )}
      >
        {/* Halo decorativo */}
        <div
          className={cn(
            "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl transition-opacity",
            unlocked
              ? "bg-bafo-gold/10 group-hover:bg-bafo-gold/20"
              : "bg-bafo-royal/15"
          )}
        />

        <div className="relative flex items-start gap-4">
          {/* Ícone */}
          <div
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center rounded-lg border",
              unlocked
                ? "border-bafo-gold/30 bg-bafo-gold/10 text-bafo-gold"
                : "border-bafo-royal/40 bg-bafo-royal/15 text-bafo-cream/70"
            )}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-display text-sm tracking-widest text-bafo-ash">
                    MÓDULO {mod.number}
                  </span>
                  {mod.flag === "BÔNUS" && (
                    <Badge className="h-5 rounded-sm border-none bg-bafo-lime/15 px-1.5 text-[10px] font-bold text-bafo-lime hover:bg-bafo-lime/20">
                      BÔNUS
                    </Badge>
                  )}
                </div>
                <h3 className="font-display text-lg leading-tight text-bafo-cream sm:text-xl">
                  {mod.title}
                </h3>
                <p className="mt-1 text-sm text-bafo-cream/70">{mod.subtitle}</p>
              </div>

              {/* Status */}
              {unlocked ? (
                <div className="inline-flex shrink-0 items-center gap-1 rounded-full border border-bafo-lime/30 bg-bafo-lime/10 px-2.5 py-0.5">
                  <CheckCircle2 className="h-3 w-3 text-bafo-lime" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-bafo-lime">
                    Liberado
                  </span>
                </div>
              ) : (
                <div className="inline-flex shrink-0 items-center gap-1 rounded-full border border-bafo-gold/30 bg-bafo-gold/10 px-2.5 py-0.5">
                  <Lock className="h-3 w-3 text-bafo-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-bafo-gold">
                    Bloqueado
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              {unlocked ? (
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-bafo-gold">
                  Começar agora
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <Timer className="h-3.5 w-3.5 text-bafo-gold" />
                  <Countdown
                    days={days}
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CrossellCard({ mod, index }: { mod: BafoModule; index: number }) {
  const Icon = mod.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
    >
      <Link
        to={`/extra/${mod.slug}`}
        className={cn(
          "group relative block overflow-hidden rounded-xl border border-bafo-gold/30 p-5 transition-all",
          "bg-gradient-to-br from-bafo-coal via-bafo-coal to-bafo-black",
          "hover:border-bafo-gold/70 hover:shadow-[0_18px_50px_-18px_rgba(242,194,48,0.5)]"
        )}
      >
        {/* shine line topo */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bafo-gold to-transparent" />

        {/* glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-bafo-gold/20 blur-3xl transition-opacity group-hover:bg-bafo-gold/30" />

        <div className="relative flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-bafo-gold/20 ring-1 ring-bafo-gold/50">
            <Icon className="h-5 w-5 text-bafo-gold" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-bafo-gold" />
              <span className="font-display text-sm tracking-widest text-bafo-gold">
                EXTRA PREMIUM
              </span>
              <Badge className="h-5 rounded-sm border-none bg-bafo-gold px-1.5 text-[10px] font-bold text-bafo-black hover:bg-bafo-gold-light">
                NOVO
              </Badge>
            </div>
            <h3 className="font-display text-lg leading-tight text-bafo-cream sm:text-xl">
              {mod.title}
            </h3>
            <p className="mt-1 text-sm text-bafo-cream/75">{mod.subtitle}</p>

            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-bafo-gold">
                Ver oferta
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="rounded-md border border-bafo-gold/40 bg-bafo-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bafo-gold">
                em destaque
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ModuleList() {
  const all = getAllModulesSorted();

  return (
    <div className="space-y-8">
      {/* Crossells em destaque */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-bafo-gold">
              ⚡ EXTRAS PREMIUM
            </p>
            <h2 className="font-display text-xl tracking-wide text-bafo-cream">
              Vire o jogo de vez. Não pare no básico.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {crossells.map((mod, i) => (
            <CrossellCard key={mod.slug} mod={mod} index={i} />
          ))}
        </div>
      </section>

      {/* Módulos principais */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-bafo-ash">
              SEU TREINAMENTO
            </p>
            <h2 className="font-display text-xl tracking-wide text-bafo-cream">
              Módulos — do pior erro à técnica final
            </h2>
          </div>
          <span className="hidden text-xs text-bafo-ash sm:inline">
            {all.length} módulos
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {all.map((mod, i) => (
            <ModuleCard key={mod.slug} mod={mod} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
