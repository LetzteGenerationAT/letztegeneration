import moment from "moment";
// import { useDispatch, useSelector } from 'react-redux'
import { useSession } from "next-auth/react";
import TitleCard from "~/components/Card/TitleCard";
// import { openModal } from '../common/modalSlice';
// import { deleteLead, getLeadsContent } from './leadSlice';
import { MODAL_BODY_TYPES } from "~/utils/globalConstantUtil";
import Layout from "~/components/Dashboard/Layout";
import { api } from "~/utils/api";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import EnvelopeIcon from "@heroicons/react/24/outline/EnvelopeIcon";
import PhoneIcon from "@heroicons/react/24/outline/PhoneIcon";
import DocumentPlusIcon from "@heroicons/react/24/outline/DocumentPlusIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import { type UserData } from "types";
import Link from "next/link";
import { useBoundStore } from "~/store";
// import { showNotification } from '../common/headerSlice';

const TopSideButtons = () => {
  // const dispatch = useDispatch();

  // const openAddNewLeadModal = () => {
  //     dispatch(openModal({ title: 'Add New Lead', bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW }));
  // };

  // const setModal = useBoundStore((state) => state.setModal);

  return (
    <div className="float-right inline-block">
      {/* <button
        className="btn-primary btn-sm btn px-6 normal-case"
        onClick={() =>
          setModal({
            isOpen: true,
            bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
            size: "lg",
            extraObject: null,
            title: "Add New Lead",
          })
        }
      >
        Add New
      </button> */}
    </div>
  );
};

function Ringer() {
  const { data: sessionData } = useSession();
  const setModal = useBoundStore((state) => state.setModal);
  const { data } = api.user.getAllUsers.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const getStatus = (index: string) => {
    if (index === "Pending")
      return <div className="badge-ghost badge">NEU</div>;
    else if (index === "Lectured")
      return <div className="badge-warning badge">Vortrag besucht</div>;
    else if (index === "Trained")
      return <div className="badge-success badge">Training absolviert</div>;
    else if (index === "Rejected")
      return <div className="badge-error badge">Rejected</div>;
    else return <div className="badge-error badge">Blockiert</div>;
  };

  const startCall = () => {
    console.log("Start Call");
  };
  const startMail = () => {
    console.log("Start Mail");
  };

  return (
    <Layout>
      <TitleCard
        title="Current Leads"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Details</th>
                <th>Name</th>
                <th>Pronomen</th>
                <th>Registriert am</th>
                <th>Region</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((user: UserData, index: number) => {
                  return (
                    <tr key={index}>
                      <td>
                        <button
                          className="btn-ghost btn-square btn"
                          // href={`mailto:${user.email}}`}
                          onClick={() =>
                            setModal({
                              isOpen: true,
                              bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
                              size: "lg",
                              extraObject: {
                                userId: user.id,
                                ringerId: sessionData?.user.id,
                                ...user,
                              },
                              title: "Ringer Notizen",
                            })
                          }
                        >
                          <DocumentTextIcon className="w-5" />
                        </button>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            {/* <div className="mask mask-squircle h-12 w-12">
                            <img src={l.avatar} alt="Avatar" />
                          </div> */}
                          </div>
                          <div>
                            <div className="font-bold">{user.givenName}</div>
                            <div className="text-sm opacity-50">
                              {user.familyName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{user.pronouns}</td>
                      <td>{moment(user.createdAt).format("DD MMM YY")}</td>
                      <td>{user.region}</td>
                      <td>{getStatus(user.status)}</td>
                      <td>
                        <button
                          className="btn-ghost btn-square btn"
                          // href={`tel:${user.phoneNumber}}`}
                          onClick={startCall}
                        >
                          <PhoneIcon className="w-5" />
                        </button>
                        <button
                          className="btn-ghost btn-square btn"
                          // href={`mailto:${user.email}}`}
                          onClick={startMail}
                        >
                          <EnvelopeIcon className="w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </Layout>
  );
}

export default Ringer;
