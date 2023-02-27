import { useEffect } from "react";
import { useBoundStore } from "~/store";
import { MODAL_BODY_TYPES } from "~/utils/globalConstantUtil";
// import { useSelector, useDispatch } from 'react-redux'
// import { closeModal } from '../features/common/modalSlice'
import CreateRingerNote from "~/components/Dashboard/Ringer/CreateRingerNote";

function ModalLayout() {
  const modal = useBoundStore((state) => state.modal);
  const setModal = useBoundStore((state) => state.setModal);

  console.log(modal);

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
              [MODAL_BODY_TYPES.LEAD_ADD_NEW]: (
                <CreateRingerNote
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
