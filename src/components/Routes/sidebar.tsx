/** Icons are imported separately to reduce build time */
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import BuildingLibraryIcon from "@heroicons/react/24/outline/BuildingLibraryIcon";
import PhoneIcon from "@heroicons/react/24/outline/PhoneIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

type Route = {
  path: string;
  icon: React.ReactNode;
  name: string;
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
  },
  {
    path: "/events", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "Events", // name that appear in Sidebar
  },
  {
    path: "", // url
    icon: <PhoneIcon className={iconClasses} />, // icon component
    name: "Ringer", // name that appear in Sidebar
    submenu: [
      {
        path: "/ringer",
        icon: <HomeIcon className={submenuIconClasses} />,
        name: "Home",
      },
      {
        path: "/ringer/pipeline",
        icon: <TableCellsIcon className={submenuIconClasses} />,
        name: "Pipeline",
      },
    ],
  },
  {
    path: "/trainer", // url
    icon: <UsersIcon className={iconClasses} />, // icon component
    name: "Trainer", // name that appear in Sidebar
  },
  {
    path: "/wiki", // url
    icon: <BuildingLibraryIcon className={iconClasses} />, // icon component
    name: "Wiki", // name that appear in Sidebar
  },
];

export type { Route, SubMenuRoute };
export default routes;
