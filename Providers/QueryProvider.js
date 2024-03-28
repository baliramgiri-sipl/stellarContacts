"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
        <ToastContainer />
      <SessionProvider>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  );
}
