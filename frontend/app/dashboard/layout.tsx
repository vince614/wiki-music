import React from "react";
import { Metadata } from "next";

import DashboardMenu from "@/components/dashboard/menu";
import DashboardBreadcrumbs from "@/components/dashboard/breadcrumbs";
import { siteConfig } from "@/config/site";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-dvh w-full gap-4">
      <DashboardMenu user={session?.user} />
      <div className="w-full flex-1 p-4">
        <DashboardBreadcrumbs />
        {children}
      </div>
    </div>
  );
}
