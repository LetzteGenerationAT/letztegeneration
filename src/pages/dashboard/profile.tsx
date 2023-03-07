import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import {
  FormProvider,
  type SubmitHandler,
  useForm,
  type FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/utils/api";
import Input from "~/components/Input/Input";
import Layout from "~/components/Dashboard/Layout";
import TitleCard from "~/components/Card/TitleCard";
import Textarea from "~/components/Input/Textarea";
import Select from "~/components/Input/Select";
import _ from "lodash";

// const PHONE_REGEX = /^\+[1-9]\d{1,14}$/gim;

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profil | Letzte Generation Österreich</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <SignIn />
      </Layout>
    </>
  );
};

export default Profile;

const SignIn: React.FC = () => {
  const { data: user } = useSession({
    required: true,
  });

  const { mutateAsync } = api.user.updateProfile.useMutation();

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const refinedData = _.pickBy(
      data,
      (value, key) => value !== "" && _.get(user?.user, key) !== value
    );
    void mutateAsync(
      {
        ...refinedData,
        image: _.sample([
          "/images/avatars/avocado-food.svg",
          "/images/avatars/cacti-cactus.svg",
          "/images/avatars/coffee-cup.svg",
          "/images/avatars/lazybones-sloth.svg",
        ]),
      },
      {
        onSuccess: (updatedUser) => {
          console.log("updatedUser", updatedUser);
        },
      }
    );
  };

  return (
    <TitleCard title="Profil Einstellungen" topMargin="mt-2">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="E-Mail Adresse"
              id="email"
              defaultValue={user?.user?.email ?? ""}
              disabled
            />
            <Input
              label="Telefonnummer"
              id="phoneNumber"
              defaultValue={user?.user?.phoneNumber}
            />
            <Input
              label="Vorname"
              id="givenName"
              defaultValue={user?.user?.givenName}
            />
            <Input
              label="Nachname"
              id="familyName"
              defaultValue={user?.user?.familyName}
            />
            <Input
              label="Pronomen"
              id="pronouns"
              placeholder="sie/ihr, er/ihm, they/them, ..."
              defaultValue={user?.user?.pronouns}
            />
            <Select
              label="Region"
              id="region"
              placeholder="Wähle deine Region"
              defaultValue={user?.user?.region}
            >
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
              defaultValue={user?.user?.possibleSupportRoles}
            />
            <Textarea
              label="Wie weit bist du bereit mit deinem Protest zu gehen?"
              id="protestDegree"
              placeholder="benötige weitere Informationen, einmalige Festnahme, mehrere Festnahmen, ..."
              defaultValue={user?.user?.protestDegree}
            />
          </div>
          <div className="divider"></div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Zugewiesene Support-Rolle(n)"
              id="supportRoles"
              disabled
              // defaultValue={user?.user?.supportRoles}
            />
            <Input
              label="Zugewiesene Bezugsgruppe"
              id="affinityGroup"
              disabled
              // defaultValue={user?.user?.affinityGroup}
            />
          </div>
          <div className="mt-16">
            <button type="submit" className="btn-primary btn float-right">
              Speichern
            </button>
          </div>
        </form>
      </FormProvider>
    </TitleCard>
  );
};
