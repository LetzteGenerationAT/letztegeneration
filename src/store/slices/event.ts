import { type StateCreator } from "zustand";
import { type Event } from "@prisma/client";
import _ from "lodash";

interface EventsSlice {
  events: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (id: string) => void;
  updateEvent: (event: Event) => void;
  setEvents: (events: Event[]) => void;
}

const eventsSlice: StateCreator<EventsSlice, [], [], EventsSlice> = (set) => ({
  events: [],
  setEvents: (event: Event[]) => {
    set((state: EventsSlice) => ({
      ...state,
      events: event,
    }));
  },
  addEvent: (event: Event) => {
    set((state: EventsSlice) => ({
      ...state,
      events: [...state.events, event],
    }));
  },
  removeEvent: (id: string) => {
    set((state: EventsSlice) => ({
      ...state,
      events: _.filter(state.events, (e) => e.id !== id),
    }));
  },
  updateEvent: (event: Event) => {
    set((state: EventsSlice) => ({
      ...state,
      events: _.map(state.events, (e) => (e.id === event.id ? event : e)),
    }));
  },
});

export { eventsSlice, type EventsSlice };
