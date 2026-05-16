# O Rei do Bafo — Área de Membros (Info-App)

Área de membros (info-app) do produto **O Rei do Bafo** — o método que faz o cara parar de perder figurinha e começar a *rapelar* na roda.

## ✨ Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** (paleta inspirada na landing page)
- **shadcn/ui** (componentes copiados manualmente, sem CLI, para manter zero dependência externa de design-system)
- **Framer Motion** (microanimações)
- **React Router DOM** (SPA com rotas internas)
- **Lucide React** (ícones)
- **@visx/responsive** (Toggle Nav decorativo)

## 🎨 Paleta (extraída da landing page real)

| Token              | Hex       |
|--------------------|-----------|
| `bafo-black`       | `#0B0B0B` |
| `bafo-coal`        | `#151515` |
| `bafo-smoke`       | `#1C1C1C` |
| `bafo-royal`       | `#3C3FA6` |
| `bafo-royal-deep`  | `#2A2D7A` |
| `bafo-royal-light` | `#5559C9` |
| `bafo-gold`        | `#F2C230` |
| `bafo-gold-light`  | `#FFD55C` |
| `bafo-cream`       | `#F5F5F2` |
| `bafo-ash`         | `#9A9A95` |
| `bafo-red`         | `#E3322A` |
| `bafo-lime`        | `#B9D93A` |

## 🧭 Estrutura

```
src/
├─ components/
│  ├─ ui/                  ← shadcn (button, avatar, badge, separator, scroll-area, dropdown-menu, toggle-nav)
│  ├─ Sidebar.tsx          ← Barra lateral (componente principal — abre no hover)
│  ├─ VideoFrame.tsx       ← Moldura 4:5 do vídeo de boas-vindas
│  ├─ ModuleList.tsx       ← Lista de módulos + crossells em destaque
│  └─ Countdown.tsx        ← Contador funcional dia/hora/min/seg
├─ contexts/
│  └─ PurchaseContext.tsx  ← Estado de "quando o usuário comprou" + travel-time
├─ data/
│  └─ modules.ts           ← Catálogo completo dos módulos (copy + técnicas)
├─ pages/
│  ├─ Dashboard.tsx        ← Página inicial após login
│  ├─ ModuleDetail.tsx     ← Detalhe de módulo principal (com 3 níveis: poucas/médias/muitas figurinhas)
│  └─ CrossellDetail.tsx   ← Página de oferta dos módulos extras
├─ lib/utils.ts
├─ index.css
└─ main.tsx
```

## 🔓 Sistema de bloqueio por tempo

A liberação dos módulos avançados é feita via `localStorage` (chave `bafo_purchased_at_v1`):

| Módulo                          | Libera em |
|--------------------------------|-----------|
| 01 · Por que você nunca vira    | imediato  |
| 02 · Posição das mãos           | imediato  |
| 03 · Onde bater                 | imediato  |
| 04 · Controle de força          | 3 dias    |
| 05 · Direção do vento           | 7 dias    |
| 06 · Psicologia da roda (Bônus) | 7 dias    |

Contador real em **dias / horas / minutos / segundos** atualizando ao vivo.

Para testes existe um *Painel de Simulação de Tempo* no dashboard (botões `+3 dias`, `+7 dias`, `Resetar`).

## 🛒 Crossells

Os dois módulos extras (`/extra/bafo-a-distancia` e `/extra/momento-de-apostar-raras`) aparecem em destaque visual com gradiente dourado, marcados como **"EXTRA PREMIUM · NOVO"** — sem ofuscar a hierarquia dos módulos principais.

## 🚀 Rodando localmente

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # build de produção
npm run preview   # servir build
```

## 📦 Build

Build de produção: `dist/`. ~516 kB (157 kB gzip).

## 🎯 Próximos passos

- Plugar o vídeo real na `VideoFrame` (já tem proporção 4:5 reservada)
- Conectar autenticação real (hoje é um SPA aberto)
- Plugar checkout do Stripe/Kiwify nos crossells
- Definir preços dos módulos extras

---

> Feito com cabeça fria e tapa firme. Bafo é técnica.
