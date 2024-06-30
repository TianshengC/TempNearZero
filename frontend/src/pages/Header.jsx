const Header = () => {
  return (
    <header className="flex flex-col items-center text-textPrimary justify-center ">
      <h1 className="font-bold text-center text-2xl p-3 md:p-5">
        TempNearZero
      </h1>
      <p className="w-4/5 p-1 md:w-3/5 lg:w-1/2">
        TempNearZero is a web application that identifies the temperature values
        closest to zero from a given set of data. It features input validation,
        prioritizes positive numbers when values are equally close to zero and
        provides a user-friendly interface for data entry and result display.
      </p>
    </header>
  );
};
export default Header;
