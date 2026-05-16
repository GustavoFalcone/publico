import React, { useState } from "react";
import { ParentSize } from "@visx/responsive";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Crown, Home, User, Trophy, Cog } from "lucide-react";

const Lines = ({ width, height }: { width: number; height: number }) => {
  if (width < 10 || height < 10) return null;

  const numLines = 10;
  const pointsPerLine = 28;
  const verticalSpreadFactor = 1.6;
  const jaggedness = height / numLines / 2.6;
  const linesData = Array.from({ length: numLines }).map((_, lineIndex) => {
    const baseY = (height / (numLines + 1)) * (lineIndex + 1);
    let pathString = `M 0 ${baseY + (Math.random() - 0.5) * jaggedness * 0.5}`;
    for (let i = 1; i <= pointsPerLine; i++) {
      const x = (width / pointsPerLine) * i;
      const y = baseY + (Math.random() - 0.5) * jaggedness * verticalSpreadFactor;
      pathString += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return pathString;
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="bafo-toggle-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1C1C1C" />
          <stop offset="100%" stopColor="#0B0B0B" />
        </linearGradient>
        <linearGradient id="bafo-toggle-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F2C230" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#F2C230" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#F2C230" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#bafo-toggle-bg)" />
      {linesData.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="url(#bafo-toggle-stroke)"
          strokeWidth="1.25"
          fill="none"
          opacity={0.6}
        />
      ))}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#F2C230"
        fontFamily="'Bebas Neue', Impact, sans-serif"
        fontSize={Math.min(width / 8, 64)}
        letterSpacing="0.08em"
      >
        BAFO É TÉCNICA
      </text>
    </svg>
  );
};

interface NavLink {
  label: string;
  to: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  { label: "Início", to: "/dashboard", icon: <Home className="h-5 w-5" /> },
  { label: "Perfil", to: "/dashboard", icon: <User className="h-5 w-5" /> },
  { label: "Conquistas", to: "/dashboard", icon: <Trophy className="h-5 w-5" /> },
  { label: "Configurações", to: "/dashboard", icon: <Cog className="h-5 w-5" /> },
];

const Nav = () => {
  return (
    <ul className="bafo-toggle-nav-list">
      <li className="bafo-toggle-nav-brand">
        <Crown className="h-7 w-7 text-bafo-gold" />
        <span>O REI DO BAFO</span>
      </li>
      {navLinks.map((item) => (
        <li key={item.label}>
          <Link to={item.to} className="bafo-toggle-nav-item">
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export interface ToggleNavProps {
  width?: number;
  height?: number;
  initialShowSidebar?: boolean;
}

export const ToggleNav: React.FC<ToggleNavProps> = ({
  width,
  height,
  initialShowSidebar = true,
}) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(initialShowSidebar);

  const injectedStyles = `
    .bafo-toggle-container {
      display: flex;
      background: linear-gradient(180deg, #151515 0%, #0B0B0B 100%);
      border-radius: 0.85rem;
      border: 1px solid rgba(242, 194, 48, 0.15);
      overflow: hidden;
      box-shadow: 0 18px 60px -20px rgba(0,0,0,0.7);
    }
    .bafo-toggle-nav {
      display: flex;
      flex: 0 0 230px;
      padding: 1.25rem 1rem;
      background-color: #0B0B0B;
      transition: flex-basis 0.3s ease-in-out, min-width 0.3s ease-in-out, opacity 0.3s ease-in-out, padding 0.3s ease-in-out, border 0.3s ease-in-out;
      overflow: hidden;
      border-right: 1px solid rgba(255,255,255,0.04);
    }
    .bafo-toggle-nav.hidden {
        flex-basis: 0 !important;
        min-width: 0 !important;
        padding: 0 !important;
        opacity: 0 !important;
        border-right: none !important;
    }
    .bafo-toggle-nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .bafo-toggle-nav-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.25rem 1rem;
      font-family: 'Bebas Neue', Impact, sans-serif;
      font-size: 1.15rem;
      letter-spacing: 0.08em;
      color: #F5F5F2;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      margin-bottom: 0.5rem;
    }
    .bafo-toggle-nav-item {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      padding: 0.55rem 0.5rem;
      cursor: pointer;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.9rem;
      color: #C8C8C2;
      border-radius: 0.5rem;
      transition: background 0.15s ease, color 0.15s ease;
      text-decoration: none;
    }
    .bafo-toggle-nav-item:hover {
      background: rgba(242, 194, 48, 0.08);
      color: #F2C230;
    }
    .bafo-toggle-content {
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: hidden;
      padding: 0.85rem;
      background-color: #0B0B0B;
    }
    .bafo-toggle-controls {
      margin-bottom: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }
    .bafo-toggle-button {
      padding: 0.4rem 0.9rem;
      font-size: 0.78rem;
      font-weight: 600;
      background: linear-gradient(180deg, #F2C230 0%, #C99A1F 100%);
      color: #0B0B0B;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 0.4rem;
      cursor: pointer;
      font-family: 'Inter', system-ui, sans-serif;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      transition: filter 0.15s ease;
    }
    .bafo-toggle-button:hover { filter: brightness(1.08); }
    .bafo-toggle-status {
      color: #9A9A95;
      font-size: 0.72rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .bafo-toggle-graph {
      display: flex;
      flex: 1;
      overflow: hidden;
      border-radius: 0.5rem;
      border: 1px solid rgba(242, 194, 48, 0.1);
    }
    .bafo-toggle-graph-container { width: 100%; height: 100%; }
  `;

  return (
    <>
      <style>{injectedStyles}</style>
      <div
        className={cn("bafo-toggle-container")}
        style={width && height ? { width, height } : { width: "100%", height: "100%" }}
      >
        <div className={cn("bafo-toggle-nav", !showSidebar && "hidden")}>
          {showSidebar && <Nav />}
        </div>
        <div className="bafo-toggle-content">
          <div className="bafo-toggle-controls">
            <button
              className="bafo-toggle-button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setShowSidebar((s) => !s);
              }}
            >
              {showSidebar ? "Esconder menu" : "Abrir menu"}
            </button>
            <span className="bafo-toggle-status">Navegação rápida</span>
          </div>
          <div className="bafo-toggle-graph">
            <ParentSize className="bafo-toggle-graph-container" debounceTime={10}>
              {({ width: visWidth, height: visHeight }) => (
                <Lines width={visWidth} height={visHeight} />
              )}
            </ParentSize>
          </div>
        </div>
      </div>
    </>
  );
};
