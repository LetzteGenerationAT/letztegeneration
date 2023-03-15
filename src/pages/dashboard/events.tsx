import TitleCard from "~/components/Card/TitleCard";
import Layout from "~/components/Dashboard/Layout";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { type Event } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import EventCard from "~/components/Dashboard/Events/EventCard";
import { useBoundStore } from "~/store";
import { MODAL_BODY_TYPES } from "~/utils/globalConstantUtil";

const TopSideButtons = () => {
  const { data: sessionData } = useSession();
  const setModal = useBoundStore((state) => state.setModal);

  return (
    <div className="float-right inline-block">
      <button
        className="btn-primary btn"
        onClick={() =>
          setModal({
            isOpen: true,
            bodyType: MODAL_BODY_TYPES.EVENT_ADD_NEW,
            size: "lg",
            extraObject: sessionData?.user,
            title: "Neues Event",
          })
        }
      >
        <PlusIcon className="h-5 w-5" />
        <span className="ml-2">Neues Event</span>
      </button>
    </div>
  );
};

function Events() {
  const { data: sessionData } = useSession();
  const [events, setEvents] = useState<Event[]>([]);

  api.event.getAllEvents.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data: Event[]) => {
      console.log(data);
      setEvents(data);
    },
  });

  return (
    <Layout>
      <TitleCard title="Events" topSideButtons={<TopSideButtons />}>
        {events &&
          events.map((event: Event, index: number) => {
            return <EventCard event={event} key={index} />;
          })}
      </TitleCard>
    </Layout>
  );
}

export default Events;
