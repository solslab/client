
export default function BasicConfirm({
  children,
  onConfirm,
  onCancel
}: {
  children: React.ReactNode;
  onConfirm?:()=>void;
  onCancel?:()=>void;
}) {
  return (
    <div className='fixed inset-0 w-screen h-screen flex justify-center items-center'>
        <div className="w-96 px-16 py-8 shadow-customShadow bg-white border border-gray-50 rounded-xl flex flex-col items-center ">
      <div className="min-h-44 py-12 flex flex-col justify-center items-center">
        {children}
      </div>
      <div className="flex justify-center space-x-4">
      <button type='submit' onClick={onConfirm&& onConfirm} className="w-24 h-10 text-text-base bg-gray-20 rounded-2xl font-bold">
        예
      </button>
      <button type='button' onClick={onCancel&& onCancel} className="w-24 h-10 text-white bg-main-base rounded-2xl font-bold">
        아니오
      </button>
      </div>
    </div>
    </div>

  );
}
