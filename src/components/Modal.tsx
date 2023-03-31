import { useBoundStore } from "~/store";
import { MODAL_BODY_TYPES } from "~/utils/globalConstantUtil";
import NoteModal from "~/components/Dashboard/Ringer/NoteModal";
import EventView from "~/components/Dashboard/Events/EventView";
import EventConfirmDeletion from "~/components/Dashboard/Events/EventDelete";
import EventUpdate from "~/components/Dashboard/Events/EventUpdate";
import EventCreate from "./Dashboard/Events/EventCreate";
import UserModal from "./Dashboard/Ringer/UserModal";
import AffinityGroupModal from "./Dashboard/Ringer/AffinityGroupModal";

function ModalLayout() {
  const modal = useBoundStore((state) => state.modal);
  const setModal = useBoundStore((state) => state.setModal);

  const close = () => {
    setModal({
      isOpen: false,
      bodyType: "",
      size: "",
      extraObject: null,
      title: "",
    });
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${modal.isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${modal.size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn-sm btn-circle btn absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="pb-6 text-center text-2xl font-semibold">
            {modal.title}
          </h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.NOTE_ADD_NEW]: (
                <NoteModal
                  closeModal={close}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  extraObject={modal.extraObject}
                />
              ),
              [MODAL_BODY_TYPES.USER_EDIT_EXISTING]: (
                <UserModal
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  extraObject={modal.extraObject}
                />
              ),
              [MODAL_BODY_TYPES.USER_EDIT_AFFINITYGROUP]: (
                <AffinityGroupModal
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  extraObject={modal.extraObject}
                />
              ),
              [MODAL_BODY_TYPES.EVENT_ADD_NEW]: (
                <EventCreate
                  closeModal={close}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  extraObject={modal.extraObject}
                />
              ),
              [MODAL_BODY_TYPES.EVENT_VIEW_EXISTING]: (
                <EventView
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  extraObject={modal.extraObject}
                />
              ),
              [MODAL_BODY_TYPES.EVENT_EDIT_EXISTING]: (
                <EventUpdate
                  closeModal={close}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  extraObject={modal.extraObject}
                />
              ),
              [MODAL_BODY_TYPES.EVENT_CONFIRM_DELETION]: (
                <EventConfirmDeletion
                  closeModal={close}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  extraObject={modal.extraObject}
                />
              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[modal.bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
