import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import HomeComponent from "@/components/dashboard/page/home";

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
  return <HomeComponent />;
}
