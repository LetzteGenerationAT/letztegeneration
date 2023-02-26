/* eslint-disable @typescript-eslint/no-explicit-any */
// import { themeChange } from 'theme-change'
// import React, { useEffect, useState } from 'react'
import Image from "next/image";
// import { useSelector, useDispatch } from 'react-redux';
// import { setRightDrawerIsOpen } from '@/src/features/common/headerSlice';
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
// import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
// import SunIcon from "@heroicons/react/24/outline/SunIcon";
import Link from "next/link";
import { useBoundStore } from "~/store";

export default function TopNavigation() {
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

  const logoutUser = () => {
    try {
      void setUserData({ user: null });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const openNotification = () => {
    // dispatch(setRightDrawerIsOpen(true));
  };

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
    <div className="navbar bg-base-100 z-10 flex h-16 justify-between shadow-md">
      {/* Menu toggle for mobile view or small screen */}
      <div className="">
        <label
          htmlFor="left-sidebar-drawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <Bars3Icon className="inline-block h-5 w-5" />
        </label>
        {/* <h1 className="ml-2 text-2xl font-semibold">{pageTitle}</h1> */}
      </div>
      <div className="order-last">
        <div title="Change Theme" className="dropdown dropdown-end ">
          <div tabIndex={0} className="btn btn-ghost gap-1 normal-case">
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
          <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box scrollbar-hide top-px mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto shadow-2xl">
            <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
              {themes.map((theme) => (
                <div
                  data-act-class="outline"
                  className={
                    "outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 hover:outline"
                  }
                  data-set-theme={theme}
                  key={theme}
                >
                  <div
                    data-theme={theme}
                    className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                  >
                    <div className="grid grid-cols-5 grid-rows-3">
                      <div className="col-span-5 row-span-3 row-start-1 flex gap-1 px-4 py-3">
                        <div className="flex-grow text-sm font-bold">
                          {theme}
                        </div>
                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                          <div className="bg-primary w-2 rounded"></div>
                          <div className="bg-secondary w-2 rounded"></div>
                          <div className="bg-accent w-2 rounded"></div>
                          <div className="bg-neutral w-2 rounded"></div>
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
        <button
          className="btn btn-ghost btn-circle ml-4"
          onClick={() => openNotification()}
        >
          <div className="indicator">
            <BellIcon className="h-6 w-6" />
            {/* {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null} */}
          </div>
        </button>
        {/* Profile icon, opening menu on click */}
        <div className="dropdown dropdown-end ml-4">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
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
            className="menu menu-compact dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/dashboard/profile">Profile</Link>
            </li>
            {/* <li>
                            <a>Settings</a>
                        </li>
                        <div className="mt-0 mb-0 divider"></div> */}
            <li>
              <a onClick={logoutUser}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
