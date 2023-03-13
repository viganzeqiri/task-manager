import clsx from "clsx";

interface IProps extends React.PropsWithChildren {
  className?: string;
}

export default function GlassPane({ children, className }: IProps) {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-2 border-solid border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
}
