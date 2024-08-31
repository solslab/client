import clsx from "clsx";

export default function NextButton({
  text,
  active,
  onClick,
}: {
  text?: string;
  active?: boolean;
  onClick: () => void;
}) {
  const btnText = text || "다음";
  const isActive = active ?? true;
  const activeOnClick = isActive ? onClick : undefined;

  return (
    <button
      type="submit"
      onClick={() => activeOnClick && activeOnClick()}
      className={clsx(
        `w-44 h-16 rounded-xl text-text-base cursor-default bg-gray-10  text-xl font-bold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
        {
          "bg-main-base text-white cursor-pointer": isActive,
        }
      )}
    >
      {btnText}
    </button>
  );
}
