"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/queryClient";
import { Toaster } from "sonner";
import ThemeProvider from "./themeProvider";
import { Provider } from "react-redux";
import { store } from "../store";
import { SessionProvider } from "next-auth/react";
import ModalProvider from "./modalProvider";
import SocketProvider from "./socketProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="strife-theme"
          >
            <SocketProvider>
              {children}
              <Toaster />
              <ModalProvider />
            </SocketProvider>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
