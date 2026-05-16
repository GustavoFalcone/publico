import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, Lock, Check } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { findCrossell } from "@/data/modules";

export default function CrossellDetail() {
  const { slug } = useParams();
  const mod = slug ? findCrossell(slug) : undefined;

  if (!mod) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bafo-black text-bafo-cream">
        <div className="text-center">
          <p className="font-display text-2xl">Conteúdo não encontrado.</p>
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

  const Icon = mod.icon;

  return (
    <div className="relative flex min-h-screen w-full bg-bafo-black">
      <Sidebar />
      <main className="flex min-h-screen flex-1 flex-col pl-[3.4rem]">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-gradient-to-b from-bafo-gold/10 via-bafo-royal/5 to-transparent" />

        <header className="sticky top-0 z-30 border-b border-white/5 bg-bafo-black/70 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-bafo-ash hover:text-bafo-cream"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <div className="text-[10px] font-bold uppercase tracking-widest text-bafo-gold">
              EXTRA PREMIUM
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl border border-bafo-gold/30 bg-gradient-to-br from-bafo-coal via-bafo-coal to-bafo-black p-6 sm:p-9 card-noise"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-bafo-gold/15 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bafo-gold to-transparent" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-bafo-gold/15 ring-1 ring-bafo-gold/50">
                <Icon className="h-6 w-6 text-bafo-gold" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-bafo-gold/40 bg-bafo-gold/10 px-2.5 py-0.5">
                    <Sparkles className="h-3 w-3 text-bafo-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-bafo-gold">
                      Extra Premium
                    </span>
                  </span>
                  <span className="rounded-md bg-bafo-gold px-2 py-0.5 text-[10px] font-bold text-bafo-black">
                    NOVO
                  </span>
                </div>
                <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-bafo-cream sm:text-5xl">
                  {mod.title}
                </h1>
                <p className="mt-2 text-lg text-bafo-cream/85">{mod.subtitle}</p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bafo-cream/75 sm:text-base">
                  {mod.lead}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Conteúdo amplo */}
          <section className="mt-8 space-y-6">
            {mod.bigContent?.map((section, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-white/5 bg-bafo-coal/60"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr,420px]">
                  <div className="p-6 sm:p-8">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-bafo-gold">
                      Seção {i + 1}
                    </p>
                    <h3 className="font-display text-2xl leading-snug text-bafo-cream">
                      {section.title}
                    </h3>
                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-bafo-cream/85 sm:text-[15px]">
                      {section.body.split("\n").map((line, j) => (
                        <p key={j} className="whitespace-pre-line">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                  {section.image && (
                    <div className="relative h-56 md:h-auto">
                      <img
                        src={section.image}
                        alt={section.imageCaption}
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

          {/* CTA de compra (placeholder) */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 overflow-hidden rounded-2xl border border-bafo-gold/40 bg-gradient-to-br from-bafo-gold/15 via-bafo-coal to-bafo-black p-6 sm:p-8 card-noise"
          >
            <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-[1fr,auto]">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-bafo-gold/40 bg-bafo-gold/10 px-2.5 py-0.5">
                  <Lock className="h-3 w-3 text-bafo-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-bafo-gold">
                    Conteúdo bloqueado · aquisição extra
                  </span>
                </p>
                <h2 className="font-display text-3xl leading-tight text-bafo-cream sm:text-4xl">
                  Libere o módulo <span className="text-bafo-gold">{mod.title}</span>
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-1.5 text-sm text-bafo-cream/85 sm:grid-cols-2">
                  <Item>Acesso vitalício ao módulo</Item>
                  <Item>Bônus exclusivos para alunos</Item>
                  <Item>Suporte 24h prioritário</Item>
                  <Item>Garantia incondicional de 7 dias</Item>
                </ul>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="rounded-xl border border-bafo-gold/40 bg-bafo-black/70 px-4 py-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-bafo-ash">
                    Preço promocional
                  </p>
                  <p className="font-display text-3xl text-bafo-gold">
                    R$ <span className="text-4xl">--,--</span>
                  </p>
                  <p className="text-[10px] text-bafo-ash">em breve</p>
                </div>
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2 rounded-lg bg-bafo-gold px-5 py-2.5 text-sm font-bold text-bafo-black opacity-90 hover:bg-bafo-gold-light disabled:cursor-not-allowed"
                >
                  Quero esse módulo
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.section>

          <div className="mt-8 text-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-bafo-cream/70 hover:text-bafo-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-bafo-gold" />
      <span>{children}</span>
    </li>
  );
}
