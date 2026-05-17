import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCircle,
  Crown,
  Sparkles,
  HelpCircle,
  MessagesSquare,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { getAllModulesSorted, crossells } from "@/data/modules";
import { getUnlockState, usePurchase } from "@/contexts/PurchaseContext";
import { useSession, signOut } from "@/lib/auth";

const sidebarVariants = {
  open: { width: "17rem" },
  closed: { width: "3.4rem" },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const itemVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { x: { stiffness: 1000, velocity: -100 } },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: { x: { stiffness: 100 } },
  },
};

const transitionProps = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
  staggerChildren: 0.1,
};

const staggerVariants = {
  open: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } },
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const pathname = location.pathname;
  const { purchasedAt, now } = usePurchase();
  const { data: session } = useSession();

  const allModules = getAllModulesSorted();
  const userName = session?.user?.name || "Aluno Apelão";
  const userEmail = session?.user?.email || "membro@reidobafo.com";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.aside
      className="fixed left-0 top-0 z-40 h-full shrink-0 border-r border-white/5"
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <motion.div
        className="relative z-40 flex h-full shrink-0 flex-col bg-bafo-coal/95 backdrop-blur-md text-bafo-cream transition-all"
        variants={contentVariants}
      >
        <motion.ul variants={staggerVariants} className="flex h-full flex-col">
          <div className="flex grow flex-col items-center">
            {/* Topo - branding */}
            <div className="flex h-[62px] w-full shrink-0 border-b border-white/5 p-2">
              <div className="mt-[1.5px] flex w-full">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="w-full" asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex w-fit items-center gap-2 px-2 text-bafo-cream hover:bg-white/5"
                    >
                      <Avatar className="size-7 rounded-md ring-1 ring-bafo-gold/40">
                        <AvatarFallback className="rounded-md bg-bafo-black text-bafo-gold">
                          <Crown className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <motion.li
                        variants={itemVariants}
                        className="flex w-fit items-center gap-2"
                      >
                        {!isCollapsed && (
                          <>
                            <p className="font-display text-base leading-none tracking-wide">
                              O <span className="text-bafo-gold">REI</span> DO BAFO
                            </p>
                            <ChevronsUpDown className="h-4 w-4 text-bafo-ash/70" />
                          </>
                        )}
                      </motion.li>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-bafo-gold" /> Área do Apelão
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-bafo-gold" /> Plano Atual: Rei do Bafo
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Conteúdo principal */}
            <div className="flex h-full w-full flex-col">
              <div className="flex grow flex-col gap-4">
                <ScrollArea className="h-16 grow p-2 scrollbar-thin">
                  <div className="flex w-full flex-col gap-1">
                    {/* Dashboard */}
                    <Link
                      to="/dashboard"
                      className={cn(
                        "flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-white/5",
                        pathname === "/dashboard" && "bg-white/5 text-bafo-gold"
                      )}
                    >
                      <LayoutDashboard className="h-4 w-4 shrink-0" />
                      <motion.li variants={itemVariants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm font-medium">Dashboard</p>
                        )}
                      </motion.li>
                    </Link>

                    <Separator className="my-2" />

                    {/* Cabeçalho da lista */}
                    {!isCollapsed && (
                      <motion.div variants={itemVariants} className="px-2 pb-1">
                        <p className="text-[10px] font-bold tracking-widest text-bafo-ash">
                          MÓDULOS
                        </p>
                      </motion.div>
                    )}

                    {/* Módulos principais */}
                    {allModules.map((mod) => {
                      const { unlocked, days } = getUnlockState(
                        purchasedAt,
                        now,
                        mod.unlockAfterDays
                      );
                      const active = pathname === `/modulo/${mod.slug}`;
                      const Icon = mod.icon;
                      return (
                        <Link
                          key={mod.slug}
                          to={`/modulo/${mod.slug}`}
                          className={cn(
                            "group flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-white/5",
                            active && "bg-white/5 text-bafo-gold",
                            !unlocked && "opacity-80"
                          )}
                        >
                          <div className="relative shrink-0">
                            <Icon className="h-4 w-4" />
                            {!unlocked && (
                              <Lock className="absolute -bottom-1 -right-1 h-3 w-3 text-bafo-gold drop-shadow" />
                            )}
                          </div>
                          <motion.li variants={itemVariants} className="ml-2 min-w-0 flex-1">
                            {!isCollapsed && (
                              <div className="flex items-center justify-between gap-2">
                                <span className="truncate text-sm font-medium">
                                  <span className="text-bafo-ash mr-1">{mod.number}.</span>
                                  {mod.title.length > 22
                                    ? mod.title.slice(0, 22) + "…"
                                    : mod.title}
                                </span>
                                {!unlocked && (
                                  <Badge className="h-5 shrink-0 rounded-sm border-bafo-gold/30 bg-bafo-gold/10 px-1.5 text-[10px] font-bold text-bafo-gold hover:bg-bafo-gold/15">
                                    {days}d
                                  </Badge>
                                )}
                                {mod.flag === "BÔNUS" && unlocked && (
                                  <Badge className="h-5 shrink-0 rounded-sm border-none bg-bafo-lime/15 px-1.5 text-[9px] font-bold text-bafo-lime">
                                    BÔNUS
                                  </Badge>
                                )}
                              </div>
                            )}
                          </motion.li>
                        </Link>
                      );
                    })}

                    <Separator className="my-2" />

                    {/* Crossells em destaque */}
                    {!isCollapsed && (
                      <motion.div variants={itemVariants} className="px-2 pb-1">
                        <p className="text-[10px] font-bold tracking-widest text-bafo-gold">
                          ⚡ EXTRAS PREMIUM
                        </p>
                      </motion.div>
                    )}

                    {crossells.map((mod) => {
                      const active = pathname === `/extra/${mod.slug}`;
                      const Icon = mod.icon;
                      return (
                        <Link
                          key={mod.slug}
                          to={`/extra/${mod.slug}`}
                          className={cn(
                            "relative flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition",
                            "bg-gradient-to-r from-bafo-gold/10 via-bafo-gold/5 to-transparent",
                            "hover:from-bafo-gold/20 hover:via-bafo-gold/10 hover:to-transparent",
                            "border border-bafo-gold/15 hover:border-bafo-gold/30",
                            active && "border-bafo-gold/50 from-bafo-gold/25"
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0 text-bafo-gold" />
                          <motion.li variants={itemVariants} className="ml-2 min-w-0 flex-1">
                            {!isCollapsed && (
                              <div className="flex items-center justify-between gap-1">
                                <span className="truncate text-sm font-semibold text-bafo-cream">
                                  {mod.title.length > 18
                                    ? mod.title.slice(0, 18) + "…"
                                    : mod.title}
                                </span>
                                <Badge className="h-5 shrink-0 rounded-sm border-none bg-bafo-gold px-1.5 text-[9px] font-bold text-bafo-black hover:bg-bafo-gold-light">
                                  NEW
                                </Badge>
                              </div>
                            )}
                          </motion.li>
                        </Link>
                      );
                    })}

                    <Separator className="my-2" />

                    {/* Outros itens */}
                    <Link
                      to="/dashboard"
                      className="flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-white/5"
                    >
                      <MessagesSquare className="h-4 w-4 shrink-0" />
                      <motion.li variants={itemVariants}>
                        {!isCollapsed && (
                          <div className="ml-2 flex items-center gap-2">
                            <p className="text-sm font-medium">Comunidade</p>
                            <Badge className="h-5 rounded-sm border-none bg-bafo-royal/30 px-1.5 text-[10px] text-bafo-cream">
                              BETA
                            </Badge>
                          </div>
                        )}
                      </motion.li>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-white/5"
                    >
                      <HelpCircle className="h-4 w-4 shrink-0" />
                      <motion.li variants={itemVariants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm font-medium">Suporte 24h</p>
                        )}
                      </motion.li>
                    </Link>
                  </div>
                </ScrollArea>
              </div>

              {/* Rodapé - conta */}
              <div className="flex flex-col p-2">
                <Link
                  to="/dashboard"
                  className="flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-white/5"
                >
                  <Settings className="h-4 w-4 shrink-0" />
                  <motion.li variants={itemVariants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm font-medium">Configurações</p>
                    )}
                  </motion.li>
                </Link>
                <div>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="w-full">
                      <div className="flex h-9 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-white/5">
                        <Avatar className="size-7">
                          <AvatarFallback className="bg-bafo-royal text-bafo-cream text-[11px] font-bold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <motion.li
                          variants={itemVariants}
                          className="flex w-full items-center gap-2"
                        >
                          {!isCollapsed && (
                            <>
                              <p className="text-sm font-medium">{userName}</p>
                              <ChevronsUpDown className="ml-auto h-4 w-4 text-bafo-ash/70" />
                            </>
                          )}
                        </motion.li>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={5}>
                      <div className="flex flex-row items-center gap-2 p-2">
                        <Avatar className="size-7">
                          <AvatarFallback className="bg-bafo-royal text-bafo-cream text-[11px] font-bold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-medium">{userName}</span>
                          <span className="line-clamp-1 text-xs text-bafo-ash">
                            {userEmail}
                          </span>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4" /> Perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 cursor-pointer text-bafo-red hover:bg-bafo-red/10"
                        onClick={() => signOut()}
                      >
                        <LogOut className="h-4 w-4" /> Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.aside>
  );
}
