import moment from "moment";
import { useSession } from "next-auth/react";
import TitleCard from "~/components/Card/TitleCard";
import { MODAL_BODY_TYPES } from "~/utils/globalConstantUtil";
import Layout from "~/components/Dashboard/Layout";
import { api } from "~/utils/api";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import { useBoundStore } from "~/store";
import { UserStatus, type User } from "@prisma/client";
import { useState } from "react";
import Select from "~/components/Input/Select";
import {
  type FieldValues,
  type SubmitHandler,
  useForm,
  FormProvider,
} from "react-hook-form";
import InputWithButton from "~/components/Input/InputWithButton";
import Input from "~/components/Input/Input";

const getStatus = (index: UserStatus) => {
  if (index === "Pending") return <div className="badge-ghost badge">NEU</div>;
  else if (index === "Contacted")
    return <div className="badge-info badge">Kontaktiert</div>;
  else if (index === "Lectured")
    return <div className="badge-warning badge">Vortrag besucht</div>;
  else if (index === "Trained")
    return <div className="badge-success badge">Training absolviert</div>;
  else if (index === "Rejected")
    return <div className="badge-error badge">Rejected</div>;
  else return <div className="badge-error badge">Blockiert</div>;
};

const TopSideButtons = ({
  setFilter,
}: {
  setFilter: (filter: {
    attribute: string;
    value: string;
    status: UserStatus;
    amount: number;
  }) => void;
}) => {
  const methods = useForm({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setFilter({
      attribute: String(data.attribute),
      value: String(data.value),
      status: data.status as UserStatus,
      amount: Number(data.amount),
    });
  };

  return (
    <div className="float-right inline-block">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex w-full items-center gap-2"
        >
          <Select id="attribute">
            <option value="status">Alle</option>
            <option value="givenName">Vorname</option>
            <option value="familyName">Nachname</option>
            <option value="region">Region</option>
          </Select>
          <Select id="status">
            <option value="Pending">Neu</option>
            <option value="Contacted">Kontaktiert</option>
            <option value="Lectured">Vortrag besucht</option>
            <option value="Trained">Training absolviert</option>
            <option value="Rejected">Abgelehnt</option>
            <option value="Blocked">Blockiert</option>
          </Select>
          <Input
            id="amount"
            defaultValue={25}
            type="number"
            className="w-fit"
          />
          <InputWithButton id="value" buttonType="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default function Ringer() {
  const { data: sessionData } = useSession();
  const [users, setUsers] = useState<User[]>([]);

  const [filter, setFilter] = useState({
    attribute: "status",
    value: "",
    status: UserStatus.Pending,
    amount: 25,
  });
  const setModal = useBoundStore((state) => state.setModal);

  api.user.getUsersWithRingerNotesByAttribute.useQuery(
    {
      attribute: filter.attribute,
      value: filter.value,
      status: filter.status,
      amount: filter.amount,
    },
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data: User[]) => {
        setUsers(data);
      },
    }
  );

  return (
    <Layout>
      <TitleCard
        title="Ringer Pipeline"
        topMargin="mt-2"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        TopSideButtons={<TopSideButtons setFilter={setFilter} />}
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
                <th>Users: {users.length}</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user: User, index: number) => {
                  return (
                    <tr key={index}>
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
                      <td>{moment(user.createdAt).format("DD.MM.YYYY")}</td>
                      <td>{user.region}</td>
                      {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        <td>{user._count.ringerNotes}</td>
                      }
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
                              // href={`mailto:${user.email}}`}
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
                })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </Layout>
  );
}
