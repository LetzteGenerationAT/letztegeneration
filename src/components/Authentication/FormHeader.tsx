export default function FormHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className={`${subtitle ? "flex" : ""} mb-2`}>
      <h2 className=" text-center text-2xl font-semibold">{title}</h2>
      {subtitle && (
        <>
          <div className="divider-horizontal text-center text-2xl font-semibold">
            -
          </div>
          <h2 className=" text-center text-2xl font-semibold">{subtitle}</h2>
        </>
      )}
    </div>
  );
}
