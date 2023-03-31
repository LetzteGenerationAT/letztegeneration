import { type Event } from "@prisma/client";
import moment from "moment";

export default function EventDetails({ extraObject }: { extraObject: Event }) {
  return (
    <div className="modal-header">
      <h2 className="text-xl font-bold">Details</h2>
      <div className="flex flex-col">
        <div className="mr-4">
          <span className="mr-1 font-bold">Name:</span>
          {extraObject?.name}
        </div>
        <div className="mr-4">
          <span className="mr-1 font-bold">Datum:</span>
          {moment(extraObject?.date).format("D MMMM YYYYY HH:MM ")} Uhr
        </div>
        <div className="mr-4">
          <span className="mr-1 font-bold">Ort:</span>
          {extraObject?.location}
        </div>
        <div className="mr-4">
          <span className="mr-1 font-bold">Beschreibung:</span>
          {extraObject?.description}
        </div>
      </div>
    </div>
  );
}
