import Card from "./Card";
import SidebarLink from "./SidebarLink";

const links = [
  { id: "1", label: "Home", icon: "Grid", link: "/home" },
  {
    id: "2",
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  { id: "3", label: "Profile", icon: "User", link: "/profile" },
  {
    id: "4",
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

export default function Sidebar() {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      {links.map(({ id, ...link }) => (
        <SidebarLink key={id} link={link} />
      ))}
    </Card>
  );
}
