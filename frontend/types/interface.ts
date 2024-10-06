import { SVGProps } from "react";

// List of interfaces used in the application
export interface UserFormInterface {
  name: string;
  email: string;
  avatar?: string | null;
  provider: string;
  identifier: string;
  refreshToken?: string;
  href: string;
}

export interface IconPropsInterface extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}
