import { api } from "~/utils/api";
import moment from "moment";
import Image from "next/image";
import { type User, type RingerNote } from "@prisma/client";
import { type SetStateAction } from "react";

function Header({
  id,
  ringer,
  createdAt,
  isOwner,
  setNotes,
}: {
  id: string;
  ringer?: User;
  createdAt: Date;
  isOwner: boolean;
  setNotes: (value: SetStateAction<RingerNote[]>) => void;
}) {
  const { mutateAsync } = api.ringer.deleteOwnRingerNote.useMutation();

  const deleteRingerNote = (id: string) => {
    void mutateAsync(
      { id },
      {
        onSuccess: (createdRingerNote) => {
          console.log("createdRingerNote", createdRingerNote);
          setNotes((prev: RingerNote[]) =>
            prev.filter((note) => note.id !== createdRingerNote.id)
          );
        },
      }
    );
  };

  return (
    <div className="flex flex-shrink-0 items-center justify-between p-4 pb-0">
      <div className="flex items-center ">
        <div>
          <Image
            className="inline-block h-10 w-10 rounded-full"
            src={ringer?.image ?? "/images/avatar-default.svg"}
            alt="Image of the ringer"
            height={40}
            width={40}
          />
        </div>
        <div className="ml-3">
          <p className="text-base font-medium leading-6 text-white">
            {ringer?.givenName} {ringer?.familyName}
            <span className="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
              {" "}
              · {moment(createdAt).fromNow()}
            </span>
          </p>
        </div>
      </div>
      {isOwner && (
        <button
          className="btn-ghost btn-sm btn"
          onClick={() => {
            void deleteRingerNote(id);
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

function Body({ text }: { text: string }) {
  return (
    <div className="pl-16">
      <p className="width4-auto flex-shrink text-base font-medium text-white">
        {text}
      </p>
    </div>
  );
}

export default function RingerNote({
  ringerNote,
  isOwner,
  setNotes,
}: {
  ringerNote: RingerNote & { ringer?: User };
  isOwner: boolean;
  setNotes: (value: SetStateAction<RingerNote[]>) => void;
}) {
  return (
    <div>
      <Header
        id={ringerNote.id}
        ringer={ringerNote.ringer}
        createdAt={ringerNote.createdAt}
        isOwner={isOwner}
        setNotes={setNotes}
      />
      <Body text={ringerNote.text} />
      <div className="divider" />
    </div>
  );
}
