// import { useState } from "react";
// import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import moment from "moment";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import Textarea from "~/components/Input/Textarea";
import { api } from "~/utils/api";
// import { showNotification } from "../../common/headerSlice";
// import { addNewLead } from "../leadSlice";

export default function CreateRingerNoteModal({
  closeModal,
  extraObject,
}: {
  closeModal: () => void;
  extraObject: any;
}) {
  const { mutateAsync } = api.ringer.createRingerNote.useMutation();
  const { data } = api.ringer.getRingerNotesForUser.useQuery({
    userId: extraObject.userId,
  });

  console.log(data);

  const RINGER_SCHEMA = z.object({
    text: z.coerce.string().max(255),
  });

  const methods = useForm({
    mode: "onTouched",
    resolver: zodResolver(RINGER_SCHEMA),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const refinedData = {
      ..._.pickBy(data, (value) => value !== ""),
      ringerId: extraObject.ringerId,
      userId: extraObject.userId,
    };
    console.log("refinedData", refinedData);
    void mutateAsync(refinedData, {
      onSuccess: (createdRingerNote) => {
        console.log("createdRingerNote", createdRingerNote);
      },
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <div className="modal-header">
          <h2 className="text-xl font-bold">Details</h2>
          <div className="flex flex-col">
            <div>
              <div className="mr-4">
                <span className="mr-1 font-bold">Vor-/Nachname:</span>
                {extraObject.givenName} {extraObject.familyName}
              </div>
              <div className="mr-4">
                <span className="mr-1 font-bold">Pronomen:</span>
                {extraObject.pronouns}
              </div>
              <div className="mr-4">
                <span className="mr-1 font-bold">Region:</span>
                {extraObject.region}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="mr-4overflow-auto max-w-full">
                <span className="mr-1 font-bold">Protestbereitschaft:</span>
                {extraObject.protestDegree}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="mr-4overflow-auto max-w-full">
                <span className="mr-1 font-bold">
                  Mögliche Unterstützungsrollen:
                </span>
                {extraObject.possibleSupportRoles}
              </div>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div>
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
        </div>
        <div className="divider" />
        <div>
          {data?.map((ringerNote) => (
            <div key={ringerNote.id}>
              <div className="flex flex-shrink-0 p-4 pb-0">
                <a href="#" className="group block flex-shrink-0">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src={
                          ringerNote.ringer.image ||
                          "/images/avatar-default.svg"
                        }
                        alt="Image of the ringer"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium leading-6 text-white">
                        {ringerNote.ringer.givenName}{" "}
                        {ringerNote.ringer.familyName}
                        <span className="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                          {" "}
                          · {moment(ringerNote.createdAt).fromNow()}
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="pl-16">
                <p className="width-auto flex-shrink text-base font-medium text-white">
                  {ringerNote.text}
                </p>
              </div>
              <div className="divider" />
            </div>
          ))}
        </div>
      </FormProvider>
    </>
  );
}
