import React from "react";

import DashboardMenu from "@/components/dashboard/menu";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    // Return 403 Forbidden if the user is not authenticated
    return <div>403 Forbidden</div>;
  }

  return (
    <div className="flex h-dvh w-full gap-4">
      {/* Sidebar */}
      <DashboardMenu user={session?.user} />
      {children}
    </div>
  );
}
