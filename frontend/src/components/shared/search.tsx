const Search = () => {
  return (
    <div className="mx-4 flex items-center gap-1 rounded-full bg-white px-4 py-2">
      <img
        src="/assets/svgs/search.svg"
        alt="search-icon"
        className="w-h-7 h-7 object-fill"
      />
      <input
        type="text"
        placeholder="Search"
        className="h-full w-full border-none bg-transparent text-[#999999] outline-none"
      />
      <img
        src="/assets/svgs/arrow.svg"
        alt="arrow-icon"
        className="w-h-7 h-7 object-fill"
      />
    </div>
  );
};

export default Search;
