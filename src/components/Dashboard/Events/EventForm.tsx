import { zodResolver } from "@hookform/resolvers/zod";
import { type Event } from "@prisma/client";
import moment from "moment";
import { useSession } from "next-auth/react";
import { type SetStateAction } from "react";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import Input from "~/components/Input/Input";
import Textarea from "~/components/Input/Textarea";
import { api } from "~/utils/api";

export default function CreateNoteForm({
  closeModal,
  extraObject,
  setEvents,
}: {
  closeModal: () => void;
  extraObject: Event;
  setEvents: (value: SetStateAction<Event[]>) => void;
}) {
  const { data: sessionData } = useSession();
  const { mutateAsync } = api.event.createEvent.useMutation();

  const methods = useForm({
    mode: "onTouched",
    resolver: zodResolver(
      z.object({
        name: z.string().min(1).max(30),
        description: z.string().min(1).max(255),
        date: z.string().min(1).max(16),
        location: z.string().min(1).max(255),
        maxAttendees: z.number().min(1).max(1000),
      })
    ),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const refinedData = {
      name: extraObject?.name,
      description: extraObject?.description,
      date: extraObject?.date,
      location: extraObject?.location,
      maxAttendees: extraObject?.maxAttendees,
    };
    console.log("SUBMIT", refinedData);
    void mutateAsync(refinedData, {
      onSuccess: (result) => {
        console.log(data);
        setEvents((prev: Event[]) => [result, ...prev]);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        <Input id="name" label="Name" defaultValue={extraObject.name ?? ""} />
        <Input
          id="date"
          type="datetime-local"
          label="Datum"
          defaultValue={
            moment(extraObject.date).format("YYYY-MM-DDTHH:mm") ?? ""
          }
        />
        <Input
          id="location"
          label="Ort"
          defaultValue={extraObject.location ?? ""}
        />
        <Input
          type="number"
          id="maxAttendees"
          label="Maximale Teilnehmeranzahl"
          defaultValue={extraObject.maxAttendees ?? 0}
          validation={{
            valueAsNumber: true,
          }}
        />
        <Textarea
          id="description"
          label="Beschreibung"
          defaultValue={extraObject.description ?? ""}
        />
        <div className="modal-action">
          <button className="btn-ghost btn" onClick={() => closeModal()}>
            Cancel
          </button>
          <button className="btn-primary btn px-6" type="submit">
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
