import { api } from "~/utils/api";
import { type RingerNote } from "@prisma/client";
import moment from "moment";
import Image from "next/image";

function Header({
  ringerNote,
  ownUserId,
}: {
  ringerNote: RingerNote;
  ownUserId: string;
}) {
  const { mutateAsync } = api.ringer.deleteOwnRingerNote.useMutation();

  const deleteRingerNote = (id: string) => {
    void mutateAsync(
      { id },
      {
        onSuccess: (createdRingerNote) => {
          console.log("createdRingerNote", createdRingerNote);
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
            src={ringerNote?.ringer?.image || "/images/avatar-default.svg"}
            alt="Image of the ringer"
            height={40}
            width={40}
          />
        </div>
        <div className="ml-3">
          <p className="text-base font-medium leading-6 text-white">
            {ringerNote?.ringer?.givenName} {ringerNote?.ringer?.familyName}
            <span className="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
              {" "}
              · {moment(ringerNote.createdAt).fromNow()}
            </span>
          </p>
        </div>
      </div>
      {ringerNote.ringerId === ownUserId && (
        <button
          className="btn-ghost btn-sm btn"
          onClick={() => {
            void deleteRingerNote(ringerNote.id);
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
  ownUserId,
}: {
  ringerNote: RingerNote;
  ownUserId: string;
}) {
  return (
    <div>
      <Header ringerNote={ringerNote} ownUserId={ownUserId} />
      <Body text={ringerNote.text} />
      <div className="divider" />
    </div>
  );
}
