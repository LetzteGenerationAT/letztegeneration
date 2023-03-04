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
        "card w-full bg-base-100 p-6 shadow-xl " + (topMargin || "mt-6")
      }
    >
      {/* Title for Card */}
      <Subtitle className={TopSideButtons ? "inline-block" : ""}>
        {title}

        {TopSideButtons && (
          /* Top side button, show only if present */
          <div className="float-right inline-block">{TopSideButtons}</div>
        )}
      </Subtitle>

      <div className="divider mt-2"></div>

      {children && (
        /** Card Body */
        <div className="h-full w-full bg-base-100 pb-6">{children}</div>
      )}
    </div>
  );
}

export default TitleCard;
