import times from "../images/times.png";
import search from "../images/search.png";

const Searchbar = ({
  searchValue,
  searchValueChangeHandler,
  crossClickHandler,
}) => {
  return (
    <div className="w-full h-[60px] flex items-center box-border shadow-[4px_0_16px_10px_rgba(30,30,30,0.08)]">
      <img src={search} className="w-4 h-4 ml-6" />
      <input
        type="text"
        className="w-full h-full ml-3.5 text-base opacity-30 outline-none"
        placeholder="Search by title"
        value={searchValue}
        onChange={searchValueChangeHandler}
      />
      <img
        src={times}
        className="w-4 h-4 mr-6 cursor-pointer"
        onClick={crossClickHandler}
      />
    </div>
  );
};

export default Searchbar;
