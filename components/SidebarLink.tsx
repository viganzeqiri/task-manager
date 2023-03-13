"use client";
import Link from "next/link";
import { Settings, User, Grid, Calendar, Icon } from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const icons: Record<string, Icon> = {
  Settings,
  User,
  Grid,
  Calendar,
};

interface IProps {
  link: {
    label: string;
    link: string;
    icon: string;
  };
}

export default function SidebarLink({ link }: IProps) {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
}
