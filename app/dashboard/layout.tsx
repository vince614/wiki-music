import React, {Suspense} from "react";
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

  if (!session) {
    return (
      <div>
        <h1>Not authenticated</h1>
        <a href="/api/auth/signin">Sign in</a>
      </div>
    );
  }

  return (
    <div className="flex h-dvh w-full gap-4">
      <DashboardMenu session={session} />
      <div className="w-full flex-1 p-4">
        <DashboardBreadcrumbs />
        {children}
      </div>
    </div>
  );
}
