interface SeparatorProps {
  type: "horizontal" | "vertikal";
  className?: string;
}

const Separator = ({ type, className }: SeparatorProps) => {
  return (
    <div
      className={`${
        type === "horizontal"
          ? "border-b border-b-[#99999938]"
          : "border-r border-r-[#99999938]"
      } ${className}`}
    />
  );
};

export default Separator;
