

export default function FieldBox({feild}:{feild:string}) {
  return (
    <div
      className="border border-gray-30 rounded-xl px-4 py-1 mb-2 flex justify-center"
    >
      <div className="text-text-base text-base">{feild}</div>
    </div>
  );
}
