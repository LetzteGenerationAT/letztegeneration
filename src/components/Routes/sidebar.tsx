/** Icons are imported separately to reduce build time */
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import BuildingLibraryIcon from "@heroicons/react/24/outline/BuildingLibraryIcon";
import PhoneIcon from "@heroicons/react/24/outline/PhoneIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
import { UserRole } from "@prisma/client";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

type Route = {
  path: string;
  icon: React.ReactNode;
  name: string;
  availableFor?: UserRole[];
  submenu?: Route[] | undefined;
};

type SubMenuRoute = {
  path: string;
  icon: React.ReactNode;
  name: string;
};

const routes = [
  {
    path: "/",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Home",
    availableFor: [
      UserRole.User,
      UserRole.Ringer,
      UserRole.Trainer,
      UserRole.Admin,
    ],
  },
  {
    path: "/events", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "Events", // name that appear in Sidebar
    availableFor: [
      UserRole.User,
      UserRole.Ringer,
      UserRole.Trainer,
      UserRole.Admin,
    ],
  },
  {
    path: "", // url
    icon: <PhoneIcon className={iconClasses} />, // icon component
    name: "Ringer", // name that appear in Sidebar
    availableFor: [UserRole.Ringer, UserRole.Admin],
    submenu: [
      {
        path: "/ringer",
        icon: <HomeIcon className={submenuIconClasses} />,
        name: "Home",
        availableFor: [UserRole.Ringer, UserRole.Admin],
      },
      {
        path: "/ringer/pipeline",
        icon: <TableCellsIcon className={submenuIconClasses} />,
        name: "Pipeline",
        availableFor: [UserRole.Ringer, UserRole.Admin],
      },
    ],
  },
  {
    path: "/trainer", // url
    icon: <UsersIcon className={iconClasses} />, // icon component
    name: "Trainer", // name that appear in Sidebar
    availableFor: [UserRole.Trainer, UserRole.Admin],
  },
  {
    path: "/wiki", // url
    icon: <BuildingLibraryIcon className={iconClasses} />, // icon component
    name: "Wiki", // name that appear in Sidebar
    availableFor: [
      UserRole.Ringer,
      UserRole.Trainer,
      UserRole.User,
      UserRole.Admin,
    ],
  },
];

export type { Route, SubMenuRoute };
export default routes;
