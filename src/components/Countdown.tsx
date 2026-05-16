import { cn } from "@/lib/utils";

interface CountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  variant?: "inline" | "block";
  className?: string;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function Countdown({
  days,
  hours,
  minutes,
  seconds,
  variant = "inline",
  className,
}: CountdownProps) {
  if (variant === "block") {
    return (
      <div className={cn("flex items-stretch gap-2", className)}>
        <Unit label="dias" value={pad(days)} highlight />
        <Unit label="hrs" value={pad(hours)} />
        <Unit label="min" value={pad(minutes)} />
        <Unit label="seg" value={pad(seconds)} />
      </div>
    );
  }

  return (
    <span className={cn("inline-flex items-baseline gap-1 font-mono tabular-nums", className)}>
      <span className="text-xs font-bold tracking-wider text-bafo-gold">
        {days}d {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
      </span>
    </span>
  );
}

function Unit({
  value,
  label,
  highlight,
}: {
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "min-w-[56px] rounded-lg border border-white/10 bg-bafo-black/70 px-2.5 py-2 text-center",
        highlight && "border-bafo-gold/40 bg-bafo-gold/10"
      )}
    >
      <div
        className={cn(
          "font-mono text-xl font-bold tabular-nums leading-none",
          highlight ? "text-bafo-gold" : "text-bafo-cream"
        )}
      >
        {value}
      </div>
      <div className="mt-1 text-[9px] font-bold uppercase tracking-widest text-bafo-ash">
        {label}
      </div>
    </div>
  );
}
