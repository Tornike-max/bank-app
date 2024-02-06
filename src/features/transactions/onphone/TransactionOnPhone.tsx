export default function TransactionOnPhone() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"];
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col">
      <div className="max-w-md w-full grid grid-cols-3 bg-stone-100 rounded-lg px-4 gap-2">
        {numbers.map((number) => (
          <button>{number}</button>
        ))}
      </div>
    </div>
  );
}
