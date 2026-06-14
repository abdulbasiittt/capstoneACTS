interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="surface-card px-5 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {steps.map((step, index) => {
          const status =
            index < currentStep ? "complete" : index === currentStep ? "active" : "pending";

          return (
            <div key={step} className="flex flex-1 items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                  status === "complete"
                    ? "border-teal-500 bg-teal-500 text-white"
                    : status === "active"
                      ? "border-accent-500 bg-accent-50 text-accent-700"
                      : "border-slate-200 bg-slate-50 text-slate-400"
                }`}
              >
                {index + 1}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-700">{step}</p>
                <p className="text-xs text-slate-500">
                  {status === "complete"
                    ? "Completed"
                    : status === "active"
                      ? "Current step"
                      : "Upcoming"}
                </p>
              </div>
              {index < steps.length - 1 ? (
                <div className="hidden h-px flex-1 bg-slate-200 lg:block" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
