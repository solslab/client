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
        `rounded-3xl mx-1 mb-4 px-4 py-2 text-sm font-bold  `,
        {
          "bg-main-base text-white": active,
          "text-text-base text-base bg-bg-base hover:bg-gray-60 border border-gray-50": !active,
        }
      )}
    >
      {text}
    </button>
  );
}
