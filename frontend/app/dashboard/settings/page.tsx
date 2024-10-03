import { Metadata } from "next";
import React from "react";

import { siteConfig } from "@/config/site";
import { auth } from "@/auth";
import SettingsComponent from "@/components/dashboard/page/settings";

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
