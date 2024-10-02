"use client";

import {
  Avatar,
  Button,
  cn,
  Spacer,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { User } from "next-auth";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/icons";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { items } from "@/components/dashboard/sidebar/items";
import SidebarDrawer from "@/components/dashboard/sidebar-drawer";

interface DashboardProps {
  user?: User | undefined;
}

export default function DashboardMenu({ user }: DashboardProps) {
  const { isOpen, onOpenChange } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const onToggle = React.useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const pathname = usePathname();
  const currentPath = pathname?.split("/")?.[2];

  console.log(currentPath);

  return (
    <SidebarDrawer
      className={cn("min-w-[288px]", {
        "min-w-[76px]": isCollapsed,
      })}
      hideCloseButton={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div
        className={cn(
          "will-change relative flex h-full w-72 flex-col bg-default-100 p-6 transition-width",
          {
            "w-[83px] items-center px-[6px] py-6": isCollapsed,
          },
        )}
      >
        <div
          className={cn("flex items-center gap-3 pl-2", {
            "justify-center gap-0 pl-0": isCollapsed,
          })}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
            <Logo className="text-background" />
          </div>
          <span
            className={cn("w-full text-small font-bold uppercase opacity-100", {
              "w-0 opacity-0": isCollapsed,
            })}
          >
            Music app
          </span>
          <div className={cn("flex-end flex", { hidden: isCollapsed })}>
            <Icon
              className="cursor-pointer dark:text-primary-foreground/60 [&>g]:stroke-[1px]"
              icon="solar:round-alt-arrow-left-line-duotone"
              width={24}
              onClick={isMobile ? onOpenChange : onToggle}
            />
          </div>
        </div>
        <Spacer y={6} />
        <div className="flex items-center gap-3 px-3">
          <Avatar isBordered size="sm" src={user?.image || ""} />
          <div
            className={cn("flex max-w-full flex-col", {
              hidden: isCollapsed,
            })}
          >
            <p className="text-small font-medium text-foreground">
              {user?.name}
            </p>
            <p className="text-tiny font-medium text-default-400">
              {user?.email}
            </p>
          </div>
        </div>

        <Spacer y={6} />

        <Sidebar
          defaultOpenKeys="trending"
          iconClassName="group-data-[selected=true]:text-default-50"
          isCompact={isCollapsed}
          itemClasses={{
            base: "px-3 rounded-large data-[selected=true]:!bg-foreground",
            title: "group-data-[selected=true]:text-default-50",
          }}
          items={items}
          selectedKeys={[currentPath]}
        />

        <Spacer y={8} />

        <div
          className={cn("mt-auto flex flex-col", {
            "items-center": isCollapsed,
          })}
        >
          {isCollapsed && (
            <Button
              isIconOnly
              className="flex h-10 w-10 text-default-600"
              size="sm"
              variant="light"
            >
              <Icon
                className="cursor-pointer dark:text-primary-foreground/60 [&>g]:stroke-[1px]"
                height={24}
                icon="solar:round-alt-arrow-right-line-duotone"
                width={24}
                onClick={onToggle}
              />
            </Button>
          )}
          <Tooltip
            content="Support"
            isDisabled={!isCollapsed}
            placement="right"
          >
            <Button
              fullWidth
              className={cn(
                "justify-start truncate text-default-600 data-[hover=true]:text-foreground",
                {
                  "justify-center": isCollapsed,
                },
              )}
              isIconOnly={isCollapsed}
              startContent={
                isCollapsed ? null : (
                  <Icon
                    className="flex-none text-default-600"
                    icon="solar:info-circle-line-duotone"
                    width={24}
                  />
                )
              }
              variant="light"
            >
              {isCollapsed ? (
                <Icon
                  className="text-default-500"
                  icon="solar:info-circle-line-duotone"
                  width={24}
                />
              ) : (
                "Support"
              )}
            </Button>
          </Tooltip>
          <Tooltip
            content="Log Out"
            isDisabled={!isCollapsed}
            placement="right"
          >
            <Button
              className={cn(
                "justify-start text-default-500 data-[hover=true]:text-foreground",
                {
                  "justify-center": isCollapsed,
                },
              )}
              isIconOnly={isCollapsed}
              startContent={
                isCollapsed ? null : (
                  <Icon
                    className="flex-none rotate-180 text-default-500"
                    icon="solar:minus-circle-line-duotone"
                    width={24}
                  />
                )
              }
              variant="light"
            >
              {isCollapsed ? (
                <Icon
                  className="rotate-180 text-default-500"
                  icon="solar:minus-circle-line-duotone"
                  width={24}
                />
              ) : (
                "Log Out"
              )}
            </Button>
          </Tooltip>
        </div>
      </div>
    </SidebarDrawer>
  );
}
