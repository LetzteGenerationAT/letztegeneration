import { type StateCreator } from "zustand";
import { type Event } from "@prisma/client";

interface EventsSlice {
  events: Event | null;
  setEvent: ({}: { event: Event }) => void;
}

const eventsSlice: StateCreator<EventsSlice, [], [], EventsSlice> = (set) => ({
  events: null,
  setEvent: ({ event }: { event: Event }) => {
    set((state) => ({
      ...state,
      event,
    }));
  },
});

export { eventsSlice, type EventsSlice };
