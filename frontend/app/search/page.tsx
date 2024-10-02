"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

import { SearchResult } from "@/components/search/Search";

export default async function SearchPage() {
  return (
    <div>
      <SessionProvider>
        <SearchResult />
      </SessionProvider>
    </div>
  );
}
