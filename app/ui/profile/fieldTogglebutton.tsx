import clsx from "clsx";

export default function FieldToggleButton({
  text,
  active,
  onClick,
}: {
  text: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
    type='button'
      onClick={() => onClick()}
      className={clsx(
        `rounded-2xl mx-2 mt-4 px-3.5 py-2.5 text-sm font-bold  `,
        {
          "bg-main-base text-white": active,
          "text-base bg-bg-base hover:bg-gray-60": !active,
        }
      )}
    >
      {text}
    </button>
  );
}
