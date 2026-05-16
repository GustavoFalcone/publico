import { useMemo } from "react";
import { Sidebar } from "@/components/Sidebar";
import { VideoFrame } from "@/components/VideoFrame";
import { ModuleList } from "@/components/ModuleList";
import { ToggleNav } from "@/components/ui/toggle-nav";
import { Crown, Flame, Trophy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { usePurchase } from "@/contexts/PurchaseContext";
import { getAllModulesSorted } from "@/data/modules";

export default function Dashboard() {
  const { purchasedAt, now, travelDays, resetPurchase } = usePurchase();

  const daysSincePurchase = useMemo(() => {
    return Math.floor((now - purchasedAt) / (24 * 60 * 60 * 1000));
  }, [purchasedAt, now]);

  const all = getAllModulesSorted();
  const liberados = all.filter(
    (m) => purchasedAt + m.unlockAfterDays * 24 * 60 * 60 * 1000 <= now
  ).length;

  return (
    <div className="relative flex min-h-screen w-full bg-bafo-black bg-grid">
      <Sidebar />

      <main className="flex min-h-screen flex-1 flex-col pl-[3.4rem]">
        {/* Halo decorativo de fundo */}
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-bafo-royal/20 via-bafo-royal/5 to-transparent" />

        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-white/5 bg-bafo-black/70 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="hidden h-8 w-8 place-items-center rounded-md bg-bafo-gold/10 ring-1 ring-bafo-gold/30 sm:grid">
                <Crown className="h-4 w-4 text-bafo-gold" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-bafo-ash">
                  Área do Apelão
                </p>
                <h1 className="font-display text-lg tracking-wide text-bafo-cream sm:text-xl">
                  Dashboard
                </h1>
              </div>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <Stat icon={<Trophy className="h-3.5 w-3.5" />} label="Módulos liberados" value={`${liberados}/${all.length}`} />
              <Stat icon={<Flame className="h-3.5 w-3.5" />} label="Dias treinando" value={`${daysSincePurchase}`} />
              <Stat icon={<Sparkles className="h-3.5 w-3.5" />} label="Plano" value="Rei do Bafo" highlight />
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          {/* Hero - vídeo + copy */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-[420px,1fr]">
            <div>
              <VideoFrame />
              {/* Painel de simulação de tempo (dev/teste) */}
              <DevTimeControls
                onAdvance3={() => travelDays(3)}
                onAdvance7={() => travelDays(7)}
                onReset={resetPurchase}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col justify-center"
            >
              <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-bafo-gold/30 bg-bafo-gold/10 px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bafo-gold" />
                <span className="text-[10px] font-bold tracking-widest text-bafo-gold">
                  COMPRA CONFIRMADA · ACESSO LIBERADO
                </span>
              </div>

              <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-bafo-cream sm:text-5xl">
                Obrigado por entrar no jogo, <span className="text-gold-gradient">apelão.</span>
              </h2>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-bafo-cream/85">
                A partir de agora, você não joga mais por sorte. Você joga por{" "}
                <span className="font-serif italic text-bafo-gold">técnica</span> — e
                isso muda a roda. Muda o respeito. Muda o teu álbum.
              </p>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-bafo-ash">
                Em poucos dias o cara que zoava você vai parar pra olhar a tua mão antes
                de bater. É exatamente isso que esse método entrega. Começa pelo Módulo
                01. Não pula etapa. Os módulos foram colocados na ordem do erro mais
                comum até a técnica que vira tudo.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                <PromiseBlock value="03" label="módulos liberados na hora" />
                <PromiseBlock value="03" label="técnicas por nível (P/M/G)" />
                <PromiseBlock value="∞" label="suporte 24h" gold />
              </div>
            </motion.div>
          </section>

          {/* Lista de módulos (foco principal) */}
          <section className="mt-10">
            <ModuleList />
          </section>

          {/* Toggle Nav decorativo / navegação rápida */}
          <section className="mt-12">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-bafo-ash">
                  NAVEGAÇÃO RÁPIDA
                </p>
                <h2 className="font-display text-xl tracking-wide text-bafo-cream">
                  Acesso instantâneo
                </h2>
              </div>
            </div>
            <div className="h-[340px] w-full">
              <ToggleNav initialShowSidebar />
            </div>
          </section>

          {/* Footer leve */}
          <footer className="mt-12 flex flex-col items-center gap-1 border-t border-white/5 pt-6 pb-4 text-center text-[11px] text-bafo-ash">
            <span>
              © {new Date().getFullYear()} O Rei do Bafo · Bafo é técnica. Técnica é
              vantagem.
            </span>
            <span className="opacity-70">
              Dúvidas? Suporte 24h ativo dentro da área de membros.
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center gap-2 rounded-md border border-white/5 bg-bafo-coal/60 px-3 py-1.5 " +
        (highlight ? "border-bafo-gold/30" : "")
      }
    >
      <span className={highlight ? "text-bafo-gold" : "text-bafo-ash"}>{icon}</span>
      <div className="leading-tight">
        <div className="text-[9px] font-bold uppercase tracking-widest text-bafo-ash">
          {label}
        </div>
        <div
          className={
            "text-xs font-bold " + (highlight ? "text-bafo-gold" : "text-bafo-cream")
          }
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function PromiseBlock({
  value,
  label,
  gold,
}: {
  value: string;
  label: string;
  gold?: boolean;
}) {
  return (
    <div
      className={
        "rounded-lg border bg-bafo-coal/60 p-3 " +
        (gold
          ? "border-bafo-gold/40 bg-bafo-gold/10"
          : "border-white/10")
      }
    >
      <div
        className={
          "font-display text-2xl leading-none " +
          (gold ? "text-bafo-gold" : "text-bafo-cream")
        }
      >
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-wide text-bafo-ash">
        {label}
      </div>
    </div>
  );
}

function DevTimeControls({
  onAdvance3,
  onAdvance7,
  onReset,
}: {
  onAdvance3: () => void;
  onAdvance7: () => void;
  onReset: () => void;
}) {
  return (
    <div className="mx-auto mt-4 max-w-[420px] rounded-lg border border-white/5 bg-bafo-coal/60 p-3">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-bafo-ash">
        Painel de simulação (teste)
      </p>
      <p className="mb-3 text-[11px] leading-snug text-bafo-cream/70">
        Avance o tempo para ver os módulos serem liberados em tempo real. Em produção,
        este bloco pode ser removido.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onAdvance3}
          className="rounded-md border border-bafo-gold/30 bg-bafo-gold/10 px-2.5 py-1 text-[11px] font-bold text-bafo-gold hover:bg-bafo-gold/20"
        >
          +3 dias
        </button>
        <button
          onClick={onAdvance7}
          className="rounded-md border border-bafo-gold/30 bg-bafo-gold/10 px-2.5 py-1 text-[11px] font-bold text-bafo-gold hover:bg-bafo-gold/20"
        >
          +7 dias
        </button>
        <button
          onClick={onReset}
          className="rounded-md border border-white/10 px-2.5 py-1 text-[11px] font-bold text-bafo-cream hover:bg-white/5"
        >
          Resetar contagem
        </button>
      </div>
    </div>
  );
}
