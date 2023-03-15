import moment from "moment";
import { type Event } from "@prisma/client";
import { MODAL_BODY_TYPES } from "~/utils/globalConstantUtil";
import { useSession } from "next-auth/react";
import { useBoundStore } from "~/store";

function CardHeader({ createdAt }: { createdAt: Date }) {
  return (
    <div className="block h-full bg-primary py-4 shadow-inner max-lg:rounded-t-lg lg:w-2/12 lg:rounded-l-lg">
      <div className="text-center tracking-wide">
        <div className="text-4xl font-bold text-white">
          {moment(createdAt).format("DD")}
        </div>
        <div className="text-2xl font-normal text-white">
          {moment(createdAt).format("MMM")}
        </div>
      </div>
    </div>
  );
}

function CardFooter({
  maxAttendees,
  count,
}: {
  maxAttendees: number | null;
  count: number;
}) {
  return (
    <div className="flex w-full flex-row items-center justify-center px-2 py-4 lg:w-1/3 lg:justify-end lg:px-0">
      <span className="text-content mx-2 rounded bg-base-200 px-2 text-sm font-semibold leading-loose tracking-wider">
        Angemeldet:
        {maxAttendees ? ` ${count ?? 0}/${maxAttendees}` : ` ${count ?? 0}`}
      </span>
    </div>
  );
}

export default function EventCard({ event }: { event: Event }) {
  const setModal = useBoundStore((state) => state.setModal);

  return (
    <div className="mb-6 rounded-lg bg-base-200 shadow lg:mb-2 lg:flex">
      <CardHeader createdAt={event.createdAt} />
      <div
        className="cursor-pointer items-center self-center px-1 py-5 tracking-wide lg:w-11/12 lg:px-2 lg:py-2 xl:w-full"
        onClick={() => {
          setModal({
            isOpen: true,
            bodyType: MODAL_BODY_TYPES.EVENT_EDIT_EXISTING,
            size: "lg",
            extraObject: event,
            title: "Event",
          });
        }}
      >
        <p className="text-content px-2 text-center text-sm font-medium lg:text-left">
          {moment(event.createdAt).format("HH:MM ")} Uhr
        </p>
        <p className="text-content px-2 text-center text-xl font-semibold lg:text-left">
          {event.name}
        </p>
        <p className="text-content px-2 text-center text-sm font-medium lg:text-left">
          {event.location}
        </p>
      </div>
      <button
        className="block w-full bg-primary py-4 max-lg:rounded-b-lg lg:w-2/12 lg:rounded-r-lg"
        onClick={() => {
          console.log("Teilnehmen");
        }}
      >
        <span className="text-md text-md mx-2 rounded px-2 font-bold  text-white">
          Teilnehmen
        </span>
      </button>
      {/* <CardFooter
        maxAttendees={event.maxAttendees}
        count={event._count.attendees}
      /> */}
    </div>
  );
}
