import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { auth } from "@/auth";
import Dashboard from "@/components/dashboard/Dashboard";
import SettingsComponent from "@/components/dashboard/page/settings";
import React from "react";

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

export default async function SettingsPage() {
  const session = await auth();

  return <SettingsComponent key="settings" user={session?.user} />;
}
