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
import Textarea from "~/components/Input/Textarea";
import Select from "~/components/Input/Select";
import { useSession } from "next-auth/react";

function NoIdProvided() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">No ID provided</h1>
    </div>
  );
}

export default function ProfileForm({ id }: { id: string }) {
  const { data: user } = api.user.getUserById.useQuery({ id });
  const { mutateAsync } = api.user.update.useMutation();

  const LOGIN_SCHEMA = z.object({
    phoneNumber: z.coerce.string().max(13),
    givenName: z.string().max(255),
    familyName: z.string().max(255),
    pronouns: z.string().max(255),
    region: z.string().max(255),
    possibleSupportRoles: z.string().max(255),
    protestDegree: z.string().max(255),
  });

  const methods = useForm({
    mode: "onTouched",
    resolver: zodResolver(LOGIN_SCHEMA),
  });

  useEffect(() => {
    const defaultValues = Object() as FieldValues;
    defaultValues.email = user?.email;
    defaultValues.phoneNumber = user?.phoneNumber;
    defaultValues.givenName = user?.givenName;
    defaultValues.familyName = user?.familyName;
    defaultValues.pronouns = user?.pronouns;
    defaultValues.region = user?.region;
    defaultValues.possibleSupportRoles = user?.possibleSupportRoles;
    defaultValues.protestDegree = user?.protestDegree;
    defaultValues.supportRoles = user?.supportRoles;
    defaultValues.affinityGroup = user?.affinityGroup?.name;
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
        id,
      }),
      {
        loading: "Profil wird gespeichert...",
        success: "Profil erfolgreich gespeichert!",
        error: "Profil konnte nicht gespeichert werden!",
      }
    );
  };

  if (!id) return <NoIdProvided />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input label="E-Mail Adresse" id="email" disabled />
          <Input label="Telefonnummer" id="phoneNumber" />
          <Input label="Vorname" id="givenName" />
          <Input label="Nachname" id="familyName" />
          <Input
            label="Pronomen"
            id="pronouns"
            placeholder="sie/ihr, er/ihm, they/them, ..."
          />
          <Select label="Region" id="region" placeholder="Wähle deine Region">
            <option value="">Wähle deine Region</option>
            <option value="Wien">Wien</option>
            <option value="Niederösterreich">Niederösterreich</option>
            <option value="Oberösterreich">Oberösterreich</option>
            <option value="Steiermark">Steiermark</option>
            <option value="Kärnten">Kärnten</option>
            <option value="Tirol">Tirol</option>
            <option value="Vorarlberg">Vorarlberg</option>
            <option value="Salzburg">Salzburg</option>
            <option value="Burgenland">Burgenland</option>
          </Select>
        </div>
        <div className="divider"></div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Textarea
            label="Welche Support-Rollen könntest du übernehmen?"
            id="possibleSupportRoles"
            placeholder="Photo & Film, Vorträge, Flyern, IT Support, ..."
          />
          <Textarea
            label="Wie weit bist du bereit mit deinem Protest zu gehen?"
            id="protestDegree"
            placeholder="benötige weitere Informationen, einmalige Festnahme, mehrere Festnahmen, ..."
          />
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input label="Support-Rolle(n)" id="supportRoles" disabled />
          <Input label="Zugewiesene Bezugsgruppe" id="affinityGroup" disabled />
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
