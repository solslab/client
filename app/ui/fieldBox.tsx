

export default function FieldBox({feild}:{feild:string}) {
  return (
    <div
      className="border border-gray-30 rounded-3xl px-4 py-1 mr-2 mb-2 flex justify-center"
    >
      <div className="text-text-base text-base">{feild}</div>
    </div>
  );
}
