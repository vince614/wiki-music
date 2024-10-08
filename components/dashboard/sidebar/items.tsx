import { Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { type SidebarItem } from "@/components/dashboard/sidebar/sidebar";

/**
 * Please check the https://nextui.org/docs/guide/routing to have a seamless router integration
 */

export const items: SidebarItem[] = [
  {
    key: "trending",
    href: "/dashboard/trending",
    icon: "solar:fire-outline",
    title: "Trending",
  },
  {
    key: "search",
    href: "/dashboard/search",
    icon: "solar:magnifer-outline",
    title: "Search",
  },
  {
    key: "library",
    href: "/dashboard/library",
    icon: "solar:library-outline",
    title: "Library",
  },
  {
    key: "notifications",
    href: "#",
    icon: "solar:bell-outline",
    title: "Notifications",
    endContent: (
      <Chip size="sm" variant="flat">
        3
      </Chip>
    ),
  },
  {
    key: "settings",
    href: "/dashboard/settings",
    icon: "solar:settings-outline",
    title: "Settings",
  },
];
