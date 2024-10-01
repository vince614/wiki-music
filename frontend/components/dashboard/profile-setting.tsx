"use client";

import * as React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Icon } from "@iconify/react";
import { Button, Badge, Input, Spacer, Textarea } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { User } from "next-auth";

interface ProfileSettingCardProps {
  className?: string;
  user?: User | undefined;
}

const ProfileSetting = React.forwardRef<
  HTMLDivElement,
  ProfileSettingCardProps
>(({ className, user, ...props }, ref) => (
  <div ref={ref} className={cn("p-2", className)} {...props}>
    {/* Profile */}
    <div>
      <p className="text-base font-medium text-default-700">Profile</p>
      <p className="mt-1 text-sm font-normal text-default-400">
        This displays your public profile on the site.
      </p>
      <Card className="mt-4 bg-default-100" shadow="none">
        <CardBody>
          <div className="flex items-center gap-4">
            <Badge
              classNames={{
                badge: "w-5 h-5",
              }}
              content={
                <Button
                  isIconOnly
                  className="h-5 w-5 min-w-5 bg-background p-0 text-default-500"
                  radius="full"
                  size="sm"
                  variant="bordered"
                >
                  <Icon className="h-[9px] w-[9px]" icon="solar:pen-linear" />
                </Button>
              }
              placement="bottom-right"
              shape="circle"
            >
              <Avatar className="h-16 w-16" src={user?.image ?? ""} />
            </Badge>
            <div>
              <p className="text-sm font-medium text-default-600">
                {user?.name}
              </p>
              <p className="mt-1 text-xs text-default-400">{user?.email}</p>
              <p className="mt-1 text-xs text-default-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                nec purus feugiat, molestie ipsum et, eleifend nunc. In hac
                habitasse platea dictumst.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
    <Spacer y={4} />
    {/* Biography */}
    <div>
      <p className="text-base font-medium text-default-700">Biography</p>
      <p className="mt-1 text-sm font-normal text-default-400">
        Specify your present whereabouts.
      </p>
      <Textarea
        className="mt-2"
        classNames={{
          input: cn("min-h-[115px]"),
        }}
        placeholder="e.g., 'Kate Moore - Acme.com Support Specialist. Passionate about solving tech issues, loves hiking and volunteering."
      />
    </div>
    <Button className="mt-4 bg-default-foreground text-background" size="sm">
      Update Profile
    </Button>
  </div>
));

ProfileSetting.displayName = "ProfileSetting";

export default ProfileSetting;
