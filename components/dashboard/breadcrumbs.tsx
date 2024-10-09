"use client";

import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function DashboardBreadcrumbs() {
  const path = usePathname();

  const pathSegments = path.split("/").filter(Boolean);

  return (
    <Breadcrumbs underline="active">
      {pathSegments.map((segment, index) => {
        const isCurrent = index === pathSegments.length - 1;
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

        return (
          <BreadcrumbItem key={path} href={path} isCurrent={isCurrent}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}
