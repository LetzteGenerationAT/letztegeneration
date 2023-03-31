import { type UserData } from "types";
import ProfileForm from "~/components/Profile/ProfileForm";

export default function NoteModal({ extraObject }: { extraObject: UserData }) {
  return (
    <>
      <ProfileForm id={extraObject.id} />
    </>
  );
}
