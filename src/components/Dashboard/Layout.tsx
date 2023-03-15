import { Suspense, useRef } from "react";
import LeftSidebar from "~/components/Dashboard/LeftSidebar";
// import { useSelector, useDispatch } from 'react-redux';
// import RightSidebar from "./RightSidebar";
// import { useEffect } from 'react';
// import { setRightDrawerIsOpen, removeNotificationMessage } from '@/src/features/common/headerSlice';
// import { NotificationContainer, NotificationManager } from 'react-notifications';
// import "react-notifications/lib/notifications.css";
import TopNavigation from "~/components/Dashboard/TopNavigation";
import SuspenseContent from "~/components/Dashboard/SuspenseContent";
import Modal from "~/components/Modal";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const dispatch = useDispatch();
  // const { rightDrawerIsOpen, newNotificationMessage, newNotificationStatus } = useSelector((state) => state.header);

  // const changeRightDrawerStatus = (isOpen: boolean) => {
  // dispatch(setRightDrawerIsOpen(isOpen));
  // };

  // useEffect(() => {
  //     if (newNotificationMessage !== '') {
  //         if (newNotificationStatus === 1) NotificationManager.success(newNotificationMessage, 'Success');
  //         if (newNotificationStatus === 0) NotificationManager.error(newNotificationMessage, 'Error');
  //         dispatch(removeNotificationMessage());
  //     }
  // }, [newNotificationMessage]);

  const mainContentRef = useRef(null);
  // const { pageTitle } = useSelector((state: any) => state.header);

  // // Scroll back to top on new page load
  // useEffect(() => {
  //     mainContentRef?.current?.scroll({
  //         top: 0,
  //         behavior: 'smooth',
  //     });
  // }, [pageTitle]);

  return (
    <>
      <div className="rounded-none bg-gradient-to-r from-purple-500 to-cyan-400 p-4 text-center text-white">
        ACHTUNG! Dies ist eine Testumgebung, bitte keine echten Daten verwenden.
        💚
      </div>
      {/* Left drawer - containing page content and side bar (always open) */}
      <div className="drawer-mobile drawer">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col ">
          <TopNavigation />
          <main
            className="flex-1 overflow-y-auto bg-base-200 px-6  pt-8"
            ref={mainContentRef}
          >
            <Suspense fallback={<SuspenseContent />}>{children}</Suspense>
            <div className="h-16"></div>
          </main>
        </div>
        <LeftSidebar />
      </div>
      {/* Right drawer - containing secondary content like notifications list etc.. */}
      {/* <RightSidebar setIsOpen={changeRightDrawerStatus} isOpen={rightDrawerIsOpen} /> */}
      {/** Notification layout container */}
      {/* <NotificationContainer /> */}

      <Modal />
    </>
  );
}
