import { Metadata } from "next";

import Dashboard from "@/components/dashboard/Dashboard";
import { siteConfig } from "@/config/site";
import {auth} from "@/auth";


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

export default async function DashboardPage() {
  const session = await auth();

  return <Dashboard user={session?.user} />;
}
