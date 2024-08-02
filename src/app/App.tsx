import React from "react";
import { StoreProvider } from "./providers/StoreProvider.tsx";
import { AppRouter } from "./routes.tsx";

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
};

export default App;
