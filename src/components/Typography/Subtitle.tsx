function Subtitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`text-xl font-semibold ${className}`}>{children}</div>;
}

export default Subtitle;
