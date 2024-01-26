import { createContext, useState, ReactNode } from "react";

type FeatureCountContextProp = {
  count?: number;
  onChangeCount?: (count: number) => void;
};

export const FeatureCountContext = createContext<FeatureCountContextProp>({});

export function FeatureCountProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState<number>(0);
  const onChangeCount = (count: number) => {
    setCount(count);
  };

  return (
    <FeatureCountContext.Provider value={{ count, onChangeCount }}>
      {children}
    </FeatureCountContext.Provider>
  );
}
