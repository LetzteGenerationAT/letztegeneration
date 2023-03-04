import { api } from "~/utils/api";
import { type RingerNote } from "@prisma/client";
import { type UserData } from "types";
import Note from "~/components/Dashboard/Ringer/Note";
import CreateNoteForm from "~/components/Dashboard/Ringer/CreateNoteForm";
import { useState } from "react";

export default function Modal({
  closeModal,
  extraObject,
}: {
  closeModal: () => void;
  extraObject: UserData & RingerNote;
}) {
  const [notes, setNotes] = useState<RingerNote[]>([]);

  api.ringer.getRingerNotesForUser.useQuery(
    {
      userId: extraObject.userId,
    },
    {
      onSuccess: (data) => {
        setNotes(data);
      },
    }
  );

  return (
    <>
      <div className="modal-header">
        <h2 className="text-xl font-bold">Details</h2>
        <div className="flex flex-col">
          <div>
            <div className="mr-4">
              <span className="mr-1 font-bold">Vor-/Nachname:</span>
              {extraObject?.givenName} {extraObject.familyName}
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
              {extraObject.possibleSupportRoles}4
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
      <CreateNoteForm
        closeModal={closeModal}
        ringerId={extraObject.ringerId}
        userId={extraObject.userId}
        setNotes={setNotes}
      />
      <div className="divider" />
      {notes?.map(
        (ringerNote) =>
          ringerNote.text && (
            <Note
              key={ringerNote.id}
              ringerNote={ringerNote}
              ownUserId={extraObject.ringerId}
            />
          )
      )}
    </>
  );
}
