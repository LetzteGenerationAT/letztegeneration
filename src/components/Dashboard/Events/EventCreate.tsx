import { zodResolver } from "@hookform/resolvers/zod";
import { type Event } from "@prisma/client";
import moment from "moment";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Input from "~/components/Input/Input";
import Textarea from "~/components/Input/Textarea";
import { useBoundStore } from "~/store";
import { api } from "~/utils/api";

export default function EventCreate({
  closeModal,
  extraObject,
}: {
  closeModal: () => void;
  extraObject: Event;
}) {
  const { mutateAsync } = api.event.createEvent.useMutation();
  const addEvent = useBoundStore((state) => state.addEvent);

  const methods = useForm({
    mode: "onTouched",
    resolver: zodResolver(
      z.object({
        name: z.string().min(1).max(30),
        description: z.string().min(1).max(255),
        date: z.date().min(new Date()),
        location: z.string().min(1).max(255),
        maxAttendees: z.number().min(1).max(1000),
      })
    ),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const refinedData = {
      name: data?.name,
      description: data?.description,
      date: data?.date?.toISOString(),
      location: data?.location,
      maxAttendees: data?.maxAttendees,
    };

    void toast.promise(
      mutateAsync(refinedData, {
        onSuccess: (result) => {
          addEvent(result);
          closeModal();
        },
      }),
      {
        loading: "Event wird erstellt...",
        success: "Event erfolgreich erstellt!",
        error: "Event konnte nicht erstellt werden!",
      }
    );
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
          validation={{
            valueAsDate: true,
          }}
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
            ABBRECHEN
          </button>
          <button className="btn-primary btn px-6" type="submit">
            SPEICHERN
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
