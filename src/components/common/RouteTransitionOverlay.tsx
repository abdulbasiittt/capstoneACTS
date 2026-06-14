import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { BrandLogo } from "../layout/BrandLogo";

export function RouteTransitionOverlay() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 520);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-0 z-[70] flex items-center justify-center transition duration-300 ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-mist/70 backdrop-blur-sm" />
      <div className="relative surface-card min-w-[320px] px-6 py-5 shadow-glow">
        <div className="flex items-center gap-4">
          <BrandLogo className="h-12 w-12 rounded-2xl shadow-glow" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900">Loading ACTS workspace</p>
            <p className="mt-1 text-sm text-slate-500">
              Preparing the next page and mock state transition
            </p>
          </div>
          <LoaderCircle className="h-5 w-5 animate-spin text-accent-700" />
        </div>
        <div className="loading-track mt-4">
          <div className="loading-fill" />
          <div className="loading-shimmer" />
        </div>
      </div>
    </div>
  );
}
