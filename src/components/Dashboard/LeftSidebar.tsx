import type { Route } from "~/components/Routes/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import routes from "~/components/Routes/sidebar";
import SidebarSubmenu from "~/components/Dashboard/SidebarSubmenu";

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <div className="drawer-side">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu w-80 bg-base-100 text-base-content">
        <li className="h-16 text-xl font-semibold">
          <Link href={"/dashboard"}>
            <Image
              className="w-10"
              src="/logo.png"
              alt="DashWind Logo"
              width={192}
              height={192}
            />
            Letzte Generation
          </Link>
        </li>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {routes.map((route: Route, k: number) => {
          return (
            <li key={k}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <Link
                  href={route.path}
                  className={`${
                    pathname === route.path
                      ? "bg-base-200  font-semibold "
                      : "font-normal"
                  }`}
                >
                  {route.icon} {route.name}
                  {pathname === route.path ? (
                    <span
                      className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
