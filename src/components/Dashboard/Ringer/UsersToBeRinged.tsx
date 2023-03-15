import { GetStatus } from "~/components/Dashboard/Ringer/RingerStatus";
import moment from "moment";
import { useSession } from "next-auth/react";
import TitleCard from "~/components/Card/TitleCard";
import { api } from "~/utils/api";
import { type User } from "@prisma/client";
import { useState } from "react";

export default function UsersToBeRinged() {
  const { data: sessionData } = useSession();
  const [users, setUsers] = useState<User[]>([]);

  api.user.getNewlyRegisteredUsers.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data: User[]) => {
      setUsers(data);
    },
  });

  return (
    <TitleCard title="Neu Registriere Aktivisti" topMargin="mt-2">
      {/* Leads List in table format loaded from slice after api call */}
      <div className="w-full overflow-x-auto">
        <table className="table h-full w-full overflow-hidden">
          <thead>
            <tr>
              <th>Name</th>
              <th>Pronomen</th>
              <th>Registriert am</th>
              <th>Notes</th>
              <th>Status</th>
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
                    {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                      <td>{user._count.ringerNotes}</td>
                    }
                    <td>
                      <GetStatus status={user.status} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}
