import Subtitle from "~/components/Typography/Subtitle";

function TitleCard({
  title,
  children,
  topMargin,
  topSideButtons,
}: {
  title: string;
  children: React.ReactNode;
  topMargin?: string;
  topSideButtons?: React.ReactNode;
}) {
  return (
    <div
      className={
        `card w-full bg-base-100 p-6 shadow-xl` + (topMargin || "mt-6")
      }
    >
      {/* Title for Card */}
      <Subtitle className={topSideButtons ? "inline-block" : ""}>
        {title}

        {topSideButtons && (
          /* Top side button, show only if present */
          <div className="float-right inline-block">{topSideButtons}</div>
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
