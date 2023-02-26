function HelperText({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`text-slate-400 ${className}`}>{children}</div>;
}

export default HelperText;
