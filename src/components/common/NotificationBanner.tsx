import { CheckCircle2, Info, X } from "lucide-react";
import { useActs } from "../../context/AppContext";

export function NotificationBanner() {
  const { notification, dismissNotification } = useActs();

  if (!notification) {
    return null;
  }

  const isSuccess = notification.tone === "success";

  return (
    <div className="mb-6 animate-reveal">
      <div
        className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-sm ${
          isSuccess
            ? "border-teal-200 bg-teal-50 text-teal-900"
            : "border-accent-200 bg-accent-50 text-accent-900"
        }`}
      >
        <div className="mt-0.5">
          {isSuccess ? <CheckCircle2 className="h-5 w-5" /> : <Info className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{notification.title}</p>
          <p className="mt-1 text-sm text-slate-700">{notification.message}</p>
        </div>
        <button
          type="button"
          onClick={dismissNotification}
          className="rounded-full p-1 text-slate-500 transition hover:bg-white/70 hover:text-slate-700"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
