import Subtitle from "~/components/Typography/Subtitle";

function TitleCard({
  title,
  children,
  topMargin,
  TopSideButtons,
}: {
  title: string;
  children: React.ReactNode;
  topMargin?: string;
  TopSideButtons?: React.ReactNode;
}) {
  return (
    <div
      className={
        "card bg-base-100 w-full p-6 shadow-xl " + (topMargin || "mt-6")
      }
    >
      {/* Title for Card */}
      <Subtitle className={TopSideButtons ? "inline-block" : ""}>
        {title}

        {/* Top side button, show only if present */}
        {TopSideButtons && (
          <div className="float-right inline-block">{TopSideButtons}</div>
        )}
      </Subtitle>

      <div className="divider mt-2"></div>

      {/** Card Body */}
      <div className="bg-base-100 h-full w-full pb-6">{children}</div>
    </div>
  );
}

export default TitleCard;
