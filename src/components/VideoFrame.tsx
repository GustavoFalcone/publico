import { motion } from "framer-motion";
import { PlayCircle, Sparkles } from "lucide-react";

export function VideoFrame() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto w-full max-w-[420px]"
        style={{ aspectRatio: "4 / 5" }}
      >
        {/* Glow externo */}
        <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-tr from-bafo-gold/30 via-bafo-royal/30 to-bafo-gold/20 opacity-60 blur-2xl" />

        {/* Moldura */}
        <div className="card-noise relative h-full w-full overflow-hidden rounded-2xl border border-bafo-gold/30 bg-gradient-to-br from-bafo-coal via-bafo-black to-bafo-coal shadow-2xl">
          {/* Faixa superior */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-white/5 bg-black/40 px-4 py-2 backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-bafo-red" />
              <span className="text-[10px] font-bold tracking-widest text-bafo-cream/80">
                AULA DE BOAS-VINDAS
              </span>
            </div>
            <span className="text-[10px] tracking-widest text-bafo-ash">4:5</span>
          </div>

          {/* Conteúdo central */}
          <div className="flex h-full w-full flex-col items-center justify-center px-6 pb-8 pt-12 text-center">
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-5 grid h-20 w-20 place-items-center rounded-full bg-bafo-gold/15 ring-1 ring-bafo-gold/40"
            >
              <PlayCircle className="h-10 w-10 text-bafo-gold" />
            </motion.div>

            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-bafo-gold/30 bg-bafo-gold/10 px-3 py-1">
              <Sparkles className="h-3 w-3 text-bafo-gold" />
              <span className="text-[10px] font-bold tracking-widest text-bafo-gold">
                ACESSO LIBERADO
              </span>
            </div>

            <h2 className="font-display text-3xl leading-[0.95] tracking-wide text-bafo-cream">
              SEJA BEM-VINDO, <span className="text-bafo-gold">APELÃO.</span>
            </h2>

            <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-bafo-cream/80">
              A partir de agora você não joga mais por sorte. Você joga por{" "}
              <span className="font-serif italic text-bafo-gold">técnica</span>.
            </p>

            <p className="mt-3 max-w-[280px] text-xs leading-relaxed text-bafo-ash">
              O vídeo de boas-vindas será liberado em breve. Enquanto isso, comece pelo
              módulo 01 — é onde a virada começa.
            </p>
          </div>

          {/* Faixa inferior estilo player */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-black/40 px-4 py-2 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] text-bafo-ash">
                <span>00:00</span>
                <div className="h-1 w-24 rounded-full bg-white/10">
                  <div className="h-full w-0 rounded-full bg-bafo-gold" />
                </div>
                <span>--:--</span>
              </div>
              <div className="text-[10px] tracking-widest text-bafo-gold">
                EM BREVE
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
