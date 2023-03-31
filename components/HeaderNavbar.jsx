const HeaderNavbar = (props) => {
  const { handleNavigation, activeTitle } = props;

  return (
    <div className="flex sm:flex-none sm:rounded border-gray-100 border sm:w-full justify-between items-center font-semibold shadow-md sm:px-1 px-4 h-14 z-10 -mx-4 sm:mx-0 text-amber-500 bg-white">
      <button
        className={
          (activeTitle === "burger" &&
            "text-white  bg-amber-500 px-3 rounded-full") ||
          "px-3 hover:bg-amber-500 hover:text-white rounded-full"
        }
        onClick={() => {
          handleNavigation("title-burger");
        }}
      >
        burger
      </button>
      <button
        onClick={() => {
          handleNavigation("title-menu");
        }}
        className={
          (activeTitle === "menu" &&
            "text-white bg-amber-500 px-3 rounded-full") ||
          "px-3 hover:bg-amber-500 hover:text-white rounded-full"
        }
      >
        menu
      </button>
      <button
        onClick={() => {
          handleNavigation("title-drinks");
        }}
        className={
          (activeTitle === "drinks" &&
            "text-white bg-amber-500 px-3 rounded-full") ||
          "px-3 hover:bg-amber-500 hover:text-white rounded-full"
        }
      >
        drinks
      </button>
      <button
        onClick={() => {
          handleNavigation("title-dolci");
        }}
        className={
          (activeTitle === "dolci" &&
            "text-white bg-amber-500 px-3 rounded-full") ||
          "px-3 hover:bg-amber-500 hover:text-white rounded-full"
        }
      >
        dolci
      </button>
    </div>
  );
};

export default HeaderNavbar;
