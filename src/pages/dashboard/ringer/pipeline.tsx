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
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import Link from "next/link";
import { useBoundStore } from "~/store";
import { type User, type UserStatus } from "@prisma/client";
import { useEffect, useState } from "react";
import _ from "lodash";
import Select from "~/components/Input/Select";
import Input from "~/components/Input/Input";
import {
  type FieldValues,
  type SubmitHandler,
  useForm,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputWithButton from "~/components/Input/InputWithButton";
// import { showNotification } from '../common/headerSlice';

const getStatus = (index: UserStatus) => {
  if (index === "Pending") return <div className="badge-ghost badge">NEU</div>;
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
  setFilter: (filter: { attribute: string; value: string }) => void;
}) => {
  const methods = useForm({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setFilter({
      attribute: String(data.attribute),
      value: String(data.value),
    });
    //   {
    //     ...refinedData,
    //     image: _.sample([
    //       "/images/avatars/avocado-food.svg",
    //       "/images/avatars/cacti-cactus.svg",
    //       "/images/avatars/coffee-cup.svg",
    //       "/images/avatars/lazybones-sloth.svg",
    //     ]),
    //   },
    //   {
    //     onSuccess: (updatedUser) => {
    //       console.log("updatedUser", updatedUser);
    //     },
    //   }
    // );
  };

  return (
    <div className="float-right inline-block">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex w-full items-center gap-2"
        >
          <Select id="attribute">
            <option value="all">Alle</option>
            <option value="givenName">Vorname</option>
            <option value="familyName">Nachname</option>
            <option value="region">Region</option>
            <option value="region">Region</option>
          </Select>
          <InputWithButton id="value" buttonType="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default function Ringer() {
  const { data: sessionData } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState({ attribute: "all", value: "" });
  const setModal = useBoundStore((state) => state.setModal);

  api.user.getUsersByAttribute.useQuery(
    {
      attribute: filter.attribute,
      value: filter.value,
    },
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setUsers(data);
      },
    }
  );

  return (
    <Layout>
      <TitleCard
        title="Ringer Pipeline"
        topMargin="mt-2"
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
                <th>Status</th>
                <th>Region</th>
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
                      <td>{moment(user.createdAt).format("DD MMM YY")}</td>
                      <td>{getStatus(user.status)}</td>
                      <td>{user.region}</td>
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
                                  extraObject: {
                                    userId: user.id,
                                    ringerId: sessionData?.user.id,
                                    ...user,
                                  },
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
