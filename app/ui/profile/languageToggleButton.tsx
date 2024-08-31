import clsx from "clsx";

export default function LanguageToggleButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
    type='button'
      onClick={() => onClick()}
      className="rounded-xl mx-2 mt-4 bg-main-light px-3.5 py-2.5 text-sm font-bold text-gray-80 "
    >
      {text}
      <span className="ml-2">X</span>
    </button>
  );
}
