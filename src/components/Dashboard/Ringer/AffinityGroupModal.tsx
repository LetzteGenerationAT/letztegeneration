import { type UserData } from "types";
import _ from "lodash";
import { useEffect } from "react";
import {
  FormProvider,
  type SubmitHandler,
  useForm,
  type FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import Input from "~/components/Input/Input";
import Select from "~/components/Input/Select";

function NoIdProvided() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">No ID provided</h1>
    </div>
  );
}

export default function AffinityGroupModal({
  extraObject,
}: {
  extraObject: UserData;
}) {
  const { data: user } = api.user.getUserById.useQuery({ id: extraObject.id });
  const { data: affinityGroups } = api.affinityGroup.getAll.useQuery();
  const { mutateAsync } = api.user.update.useMutation();

  const SCHEMA = z.object({
    supportRoles: z.string().max(255),
    affinityGroupId: z.string(),
  });

  const methods = useForm({
    mode: "onTouched",
    resolver: zodResolver(SCHEMA),
  });

  useEffect(() => {
    const defaultValues = Object() as FieldValues;
    supportRoles: user?.supportRoles;
    defaultValues.affinityGroupId = user?.affinityGroupId;
    methods.reset({ ...defaultValues });
  }, [methods, user]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const refinedData = _.pickBy(
      data,
      (value, key) => value !== "" && _.get(user, key) !== value
    );
    void toast.promise(
      mutateAsync({
        ...refinedData,
        id: extraObject.id,
      }),
      {
        loading: "Profil wird gespeichert...",
        success: "Profil erfolgreich gespeichert!",
        error: "Profil konnte nicht gespeichert werden!",
      }
    );
  };

  if (!extraObject.id) return <NoIdProvided />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1">
          <Input label="Support-Rolle(n)" id="supportRoles" />
          <Select id="affinityGroupId" label="Bezugsgruppe">
            {affinityGroups?.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="mt-16">
          <button type="submit" className="btn-primary btn float-right">
            Speichern
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
