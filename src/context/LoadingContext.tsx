import { createContext, useCallback, useContext, useState } from "react";
import Spinner from "../components/ui/Spinner";

type LoadingContextType = {
  show: () => void;
  hide: () => void;
  isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: any }) => {
  const [count, setCount] = useState(0);

  const show = useCallback(() => setCount((c) => c + 1), []);
  const hide = useCallback(() => setCount((c) => Math.max(0, c - 1)), []);

  return (
    <LoadingContext.Provider value={{ show, hide, isLoading: count > 0 }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingOverlay = () => {
  const ctx = useLoading();
  if (!ctx || !ctx.isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner size={48} className="text-white" />
    </div>
  );
};

export default LoadingContext;
