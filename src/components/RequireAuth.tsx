import { Navigate, useLocation } from "react-router-dom";
import { useSession } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const location = useLocation();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bafo-black">
        <Loader2 className="h-8 w-8 animate-spin text-bafo-gold" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
