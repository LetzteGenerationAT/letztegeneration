/* eslint-disable @typescript-eslint/no-explicit-any */
// import { themeChange } from 'theme-change'
// import React, { useEffect, useState } from 'react'
import Image from "next/image";
// import { useSelector, useDispatch } from 'react-redux';
// import { setRightDrawerIsOpen } from '@/src/features/common/headerSlice';
// import BellIcon from "@heroicons/react/24/solid/BellIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
// import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
// import SunIcon from "@heroicons/react/24/outline/SunIcon";
import Link from "next/link";
import { useBoundStore } from "~/store";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TopNavigation() {
  const router = useRouter();
  const setUserData = useBoundStore((state) => state.setUserData);
  // const dispatch = useDispatch();
  // const { noOfNotifications, pageTitle } = useSelector((state) => state.header);
  // const [currentTheme, setCurrentTheme] = useState() as any

  // useEffect(() => {
  //   if (currentTheme) {
  //     localStorage.setItem('theme', currentTheme)
  //     themeChange(currentTheme)
  //   } else if (localStorage.getItem('theme')) {
  //     themeChange(localStorage.getItem('theme') as any)
  //   } else {
  //     themeChange('dark' as any)
  //   }
  // }, [currentTheme])

  const logoutUser = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setUserData({ user: null });
      router.push("/");
    }
  };

  // const openNotification = () => {0
  //   // dispatch(setRightDrawerIsOpen(true));
  // };

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  return (
    <div className="navbar z-10 flex h-16 justify-between bg-base-100 shadow-md">
      {/* Menu toggle for mobile view or small screen */}
      <div className="">
        <label
          htmlFor="left-sidebar-drawer"
          className="btn-primary drawer-button btn lg:hidden"
        >
          <Bars3Icon className="inline-block h-5 w-5" />
        </label>
        {/* <h1 className="ml-2 text-2xl font-semibold">{pageTitle}</h1> */}
      </div>
      <div className="order-last">
        <div title="Change Theme" className="dropdown-end dropdown ">
          <div tabIndex={0} className="btn-ghost btn gap-1 normal-case">
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              ></path>
            </svg>
            <span className="hidden md:inline">Theme</span>
            <svg
              width="12px"
              height="12px"
              className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <div className="scrollbar-hide dropdown-content rounded-t-box rounded-b-box top-px mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto bg-base-200 text-base-content shadow-2xl">
            <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
              {themes.map((theme) => (
                <div
                  data-act-class="outline"
                  className={
                    "overflow-hidden rounded-lg outline-2 outline-offset-2 outline-base-content hover:outline"
                  }
                  data-set-theme={theme}
                  key={theme}
                >
                  <div
                    data-theme={theme}
                    className="w-full cursor-pointer bg-base-100 font-sans text-base-content"
                  >
                    <div className="grid grid-cols-5 grid-rows-3">
                      <div className="col-span-5 row-span-3 row-start-1 flex gap-1 px-4 py-3">
                        <div className="flex-grow text-sm font-bold">
                          {theme}
                        </div>
                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                          <div className="w-2 rounded bg-primary"></div>
                          <div className="w-2 rounded bg-secondary"></div>
                          <div className="w-2 rounded bg-accent"></div>
                          <div className="w-2 rounded bg-neutral"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Light and dark theme selection toggle **/}
        {/* <label className="swap swap-rotate">
                    <input type="checkbox" />
                    <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={'fill-current w-6 h-6 ' + (currentTheme === 'dark' ? 'swap-on' : 'swap-off')} />
                    <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={'fill-current w-6 h-6 ' + (currentTheme === 'light' ? 'swap-on' : 'swap-off')} />
                </label> */}
        {/* Notification icon */}
        {/* <button
          className="btn-ghost btn-circle btn ml-4"
          onClick={() => openNotification()}
        >
          <div className="indicator">
            <BellIcon className="h-6 w-6" />
             {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null} 
          </div>
        </button> */}
        {/* Profile icon, opening menu on click */}
        <div className="dropdown-end dropdown ml-4">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <Image
                src="https://placeimg.com/80/80/people"
                alt="profile"
                width={40}
                height={40}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/dashboard/profile">Profile</Link>
            </li>
            {/* 
            <li>
              <a>Settings</a>
            </li> 
            */}
            {/* <div className="divider mt-0 mb-0"></div> */}
            <li>
              <a onClick={logoutUser}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
