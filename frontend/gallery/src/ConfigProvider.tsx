import { ConfigProvider } from "antd";

import React, { ReactNode } from "react";

function MyConfigProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "darkgreen",
        },
        components: {
          Button: {
            contentFontSize: 5,
            algorithm: true, // Enable algorithm
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default MyConfigProvider;
