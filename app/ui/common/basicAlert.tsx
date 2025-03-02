
export default function BasicAlert({
  children,
  onClick,
  type='button'
}: {
  children: React.ReactNode;
  onClick: () => void;
  type?:'button' | 'submit' | 'reset';
}) {
  return (
    <div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-black/50 z-50'>
        <div className="w-96 px-16 py-8 shadow-customShadow bg-white border border-gray-50 rounded-xl flex flex-col items-center ">
      <div className="min-h-44 py-12 flex flex-col justify-center items-center">
        {children}
      </div>
      <button type={type} onClick={onClick} className="w-24 h-10 text-white bg-main-base rounded-2xl font-bold">
        확인
      </button>
    </div>
    </div>

  );
}
