/** Icons are imported separately to reduce build time */
// import BellIcon from "@heroicons/react/24/outline/BellIcon";
// import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
// import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
// import WalletIcon from "@heroicons/react/24/outline/WalletIcon";
// import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";
// import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
// import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
// import ShieldCheckIcon from "@heroicons/react/24/outline/ShieldCheckIcon";
// import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
// import UserIcon from "@heroicons/react/24/outline/UserIcon";
// import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
// import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
// import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
// import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
// import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";

const iconClasses = `h-6 w-6`;
// const submenuIconClasses = `h-5 w-5`;

type Route = {
  path: string;
  icon: React.ReactNode;
  name: string;
};

const routes = [
  {
    path: "/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/dashboard/ringer", // url
    icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
    name: "Ringer", // name that appear in Sidebar
  },
  {
    path: "/dashboard/charts", // url
    icon: <ChartBarIcon className={iconClasses} />, // icon component
    name: "Charts", // name that appear in Sidebar
  },
  {
    path: "/dashboard/integration", // url
    icon: <BoltIcon className={iconClasses} />, // icon component
    name: "Integration", // name that appear in Sidebar
  },
];

export type { Route };
export default routes;
