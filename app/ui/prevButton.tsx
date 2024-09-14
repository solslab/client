
export default function PrevButton({
  text,
  onClick,
}: {
  text?: string;
  onClick: () => void;
}) {
  const btnText = text ?? "이전";

  return (
    <button
      onClick={() => onClick()}
      type='button'
      className="mr-3 w-28 h-10 rounded-2xl text-text-base bg-main-light  text-xl font-bold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {btnText}
    </button>
  );
}
