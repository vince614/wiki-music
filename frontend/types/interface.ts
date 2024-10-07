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

export interface SearchResultInterface {
  songs: SongResultInterface[];
  albums: AlbumResultInterface[];
  artists: ArtistResultInterface[];
}

export interface SongResultInterface {
  name: string;
  artist: string;
  album: string;
  image: string;
  duration: string;
}

export interface AlbumResultInterface {
  name: string;
  artist: string;
  image: string;
  release_date: string;
}

export interface ArtistResultInterface {
  name: string;
  image: string;
}

export interface IconPropsInterface extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}
