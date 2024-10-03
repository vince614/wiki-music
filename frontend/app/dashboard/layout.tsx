"use server";

import React from "react";

import DashboardMenu from "@/components/dashboard/menu";
import { auth } from "@/auth";
import DashboardBreadcrumbs from "@/components/dashboard/breadcrumbs";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-dvh w-full gap-4">
      {/* Sidebar */}
      <DashboardMenu user={session?.user} />
      <div className="w-full flex-1 p-4">
        <DashboardBreadcrumbs />
        {children}
      </div>
    </div>
  );
}
