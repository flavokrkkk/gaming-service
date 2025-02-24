"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/queryClient";
import { Toaster } from "sonner";
import ThemeProvider from "./themeProvider";
import { Provider } from "react-redux";
import { store } from "../store";
import { ClerkProvider } from "@clerk/nextjs";
import ServerCustomizeModal from "@/features/server/ui/serverCustomizeModal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="strife-theme"
          >
            {children}
            <Toaster />
            <ServerCustomizeModal />;
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
