import toast from "react-hot-toast";
import { useBoundStore } from "~/store";
import { api } from "~/utils/api";

export default function EventConfirmDeletion({
  extraObject,
  closeModal,
}: {
  extraObject: { id: string };
  closeModal: () => void;
}) {
  const { mutateAsync } = api.event.deleteEvent.useMutation();

  const removeEvent = useBoundStore((state) => state.removeEvent);

  const handleDelete = () => {
    void toast.promise(
      mutateAsync(
        { id: extraObject.id },
        {
          onSuccess: (result) => {
            closeModal();
            removeEvent(result.id);
            console.log(result);
          },
        }
      ),
      {
        loading: "Event wird gelöscht...",
        success: "Event erfolgreich gelöscht!",
        error: "Event konnte nicht gelöscht werden!",
      }
    );
  };

  return (
    <div className="modal-header">
      <h2 className="text-center text-xl">Möchtest du das Event löschen?</h2>
      <div className="flex flex-col">
        <div className="modal-action flex w-full justify-between">
          <button className="btn-ghost btn" onClick={() => closeModal()}>
            ABBRECHEN
          </button>
          <button className="btn-error btn px-6" onClick={() => handleDelete()}>
            LÖSCHEN
          </button>
        </div>
      </div>
    </div>
  );
}
