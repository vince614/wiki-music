import { SVGProps } from 'react';
import { PlaylistStatus } from '@/types/enum';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
};

export type Playlist = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  likes: number;
  status: PlaylistStatus;
  createdAt: string;
}

export type Comment = {
  id: string;
  user: string;
  message: string;
  createdAt: string;
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  image: string;
  url: string;
};
