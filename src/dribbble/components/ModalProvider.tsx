import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type ModalKey = "login" | "signup" | null;

type Ctx = {
  modal: ModalKey;
  open: (m: Exclude<ModalKey, null>) => void;
  close: () => void;
};

const ModalCtx = createContext<Ctx>({ modal: null, open: () => {}, close: () => {} });

export const useModal = () => useContext(ModalCtx);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalKey>(null);
  const open = useCallback((m: Exclude<ModalKey, null>) => setModal(m), []);
  const close = useCallback(() => setModal(null), []);
  return (
    <ModalCtx.Provider value={{ modal, open, close }}>
      {children}
      {modal && <AuthModal mode={modal} onClose={close} onSwitch={(m) => setModal(m)} />}
    </ModalCtx.Provider>
  );
}

function AuthModal({
  mode,
  onClose,
  onSwitch,
}: {
  mode: "login" | "signup";
  onClose: () => void;
  onSwitch: (m: "login" | "signup") => void;
}) {
  const isSignup = mode === "signup";
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
      data-testid={`${mode}-modal`}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {isSignup ? "Sign up to Dribbble" : "Log in to Dribbble"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            data-testid={`${mode}-modal-close`}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          {isSignup && (
            <input
              type="text"
              placeholder="Full name"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              data-testid={`${mode}-name-input`}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            data-testid={`${mode}-email-input`}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            data-testid={`${mode}-password-input`}
            required
          />
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            data-testid={`${mode}-submit`}
          >
            {isSignup ? "Create Account" : "Log In"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignup ? "Already have an account? " : "New to Dribbble? "}
          <button
            onClick={() => onSwitch(isSignup ? "login" : "signup")}
            className="font-semibold text-primary hover:underline"
            data-testid={`${mode}-switch`}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
