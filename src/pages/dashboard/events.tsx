// import { FormProvider } from "react-hook-form";
import TitleCard from "~/components/Card/TitleCard";
import Layout from "~/components/Dashboard/Layout";

import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
// import { useBoundStore } from "~/store";
const TopSideButtons = () => {
  // const setModal = useBoundStore((state) => state.setModal);
  return (
    <div className="float-right inline-block">
      <button
        className="btn-primary btn"
        // onClick={() =>
        //   setModal({
        //     isOpen: true,
        //     bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
        //     size: "lg",
        //     extraObject: user,
        //   })
        // }
      >
        <PlusIcon className="h-5 w-5" />
        <span className="ml-2">Neues Event</span>
      </button>
    </div>
  );
};

function Events() {
  return (
    <Layout>
      <TitleCard
        title="Ringer Pipeline"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="w-full overflow-x-auto">
          <table className="table h-full w-full overflow-hidden">
            <thead>
              <tr>
                <th>Name</th>
                <th>Pronomen</th>
                <th>Registriert am</th>
                <th>Region</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Telefon</th>
                {/* <th>Users: {users.length}</th> */}
              </tr>
            </thead>
            <tbody>
              {/* {users &&
                users.map((user: User, index: number) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
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
                      <td>{moment(user.createdAt).format("DD.MM.YYYY")}</td>
                      <td>{user.region}</td>
                      <td>{user._count.ringerNotes}</td>
                      <td>{getStatus(user.status)}</td>
                      <td>{user.phoneNumber}</td>
                      <td className="dropdown-end dropdown">
                        <label tabIndex={0} className="btn-ghost btn m-1">
                          <EllipsisVerticalIcon className="w-5" />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu rounded-box w-52 bg-base-200 p-2 shadow"
                        >
                          <li>
                            <button
                              onClick={() =>
                                setModal({
                                  isOpen: true,
                                  bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
                                  size: "lg",
                                  extraObject: user,
                                  title: "Ringer Notizen",
                                })
                              }
                            >
                              Notizen
                            </button>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  );
                })} */}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </Layout>
  );
}

export default Events;
