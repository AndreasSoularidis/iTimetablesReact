import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ensureAuthenticated } from "../api/axiosInstance";

export default function ProtectedRoute() {
  const location = useLocation();
  const [status, setStatus] = useState<"checking" | "authenticated" | "unauthenticated">("checking");

  useEffect(() => {
    let cancelled = false;
    setStatus("checking");
    ensureAuthenticated().then((ok) => {
      if (!cancelled) setStatus(ok ? "authenticated" : "unauthenticated");
    });
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  if (status === "checking") return null;

  if (status === "unauthenticated") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
