import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { type Route } from "~/components/Routes/sidebar";
export default function SidebarSubmenu({
  submenu,
  name,
  icon,
}: {
  submenu: Route[];
  name: string;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();

  const [isExpanded, setIsExpanded] = useState(false);

  /** Open Submenu list if path found in routes, this is for directly loading submenu routes  first time */
  useEffect(() => {
    if (
      submenu.filter((m) => {
        return m.path === pathname;
      })[0]
    )
      setIsExpanded(true);
  }, [pathname, submenu]);

  return (
    <div className="flex-col">
      {/** Route header */}
      <div
        className="flex w-full justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex">
          <div className="mr-2">{icon}</div>
          <div>{name}</div>
        </div>
        <ChevronDownIcon
          className={
            "delay-400 float-right mt-1 h-5 w-5 transition-all duration-500  " +
            (isExpanded ? "rotate-180" : "")
          }
        />
      </div>

      {/** Submenu list */}
      <div className={` w-full ` + (isExpanded ? "" : "hidden")}>
        <ul className={`menu menu-compact`}>
          {submenu.map((m, k) => {
            return (
              <li key={k}>
                <Link href={m.path}>
                  {m.icon} {m.name}
                  {pathname == m.path ? (
                    <span
                      className="absolute inset-y-0 left-0 mt-1 mb-1 w-1 rounded-tr-md rounded-br-md bg-primary "
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
