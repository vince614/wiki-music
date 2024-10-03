import React from "react";

import DashboardMenu from "@/components/dashboard/menu";
import { auth, signIn } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    await signIn("spotify");
  }

  return (
    <div className="flex h-dvh w-full gap-4">
      {/* Sidebar */}
      <DashboardMenu user={session?.user} />
      {children}
    </div>
  );
}
