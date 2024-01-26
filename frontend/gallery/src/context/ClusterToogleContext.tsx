import { createContext, useState, ReactNode } from "react";

type ClusterToggleContextProps = {
  isCluster?: boolean;
  onChange?: (checked: boolean) => void;
};

export const ClusterToggleContext = createContext<ClusterToggleContextProps>(
  {}
);

export function ClusterToggleProvider({ children }: { children: ReactNode }) {
  const [isCluster, setIsCluster] = useState<boolean>(true);

  const onChange = (checked: boolean) => {
    setIsCluster(checked);
  };

  return (
    <ClusterToggleContext.Provider value={{ isCluster, onChange }}>
      {children}
    </ClusterToggleContext.Provider>
  );
}
