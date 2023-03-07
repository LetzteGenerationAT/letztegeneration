import { zodResolver } from "@hookform/resolvers/zod";
import { type User, type RingerNote } from "@prisma/client";
import { useSession } from "next-auth/react";
import { type SetStateAction } from "react";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { type UserData } from "types";
import { z } from "zod";
import Textarea from "~/components/Input/Textarea";
import { api } from "~/utils/api";

export default function CreateNoteForm({
  closeModal,
  extraObject,
  setNotes,
}: {
  closeModal: () => void;
  extraObject: UserData;
  setNotes: (value: SetStateAction<RingerNote[]>) => void;
}) {
  const { data: sessionData } = useSession();
  const { mutateAsync } = api.ringer.createRingerNote.useMutation();

  const methods = useForm({
    mode: "onTouched",
    resolver: zodResolver(
      z.object({
        text: z.coerce.string().min(1).max(255),
      })
    ),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!sessionData?.user?.id || !extraObject?.id) return;
    const refinedData = {
      text: data.text as string,
      ringerId: sessionData?.user?.id,
      userId: extraObject?.id,
    };
    console.log("refinedData", refinedData);
    void mutateAsync(refinedData, {
      onSuccess: (createdRingerNote) => {
        console.log(data);
        setNotes((prev: RingerNote[]) => [
          {
            ...createdRingerNote,
            ringer: sessionData?.user as User,
          },
          ...prev,
        ]);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        <Textarea id="text" />
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
