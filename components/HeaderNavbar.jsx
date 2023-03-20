const HeaderNavbar = (props) => {
  const { handleNavigation, activeTitle } = props;

  return (
    <div className="flex justify-between items-center font-semibold shadow-md px-5 h-14 z-10 -mx-4 text-amber-500 bg-white">
      <div
        className={
          (activeTitle === "burger" &&
            "text-white bg-amber-500 px-3 rounded-full") ||
          "px-3"
        }
        onClick={() => {
          handleNavigation("title-burger");
        }}
      >
        burger
      </div>
      <div
        onClick={() => {
          handleNavigation("title-menu");
        }}
        className={
          (activeTitle === "menu" &&
            "text-white bg-amber-500 px-3 rounded-full") ||
          "px-3"
        }
      >
        menu
      </div>
      <div
        onClick={() => {
          handleNavigation("title-drinks");
        }}
        className={
          (activeTitle === "drinks" &&
            "text-white bg-amber-500 px-3 rounded-full") ||
          "px-3"
        }
      >
        drinks
      </div>
      <div
        onClick={() => {
          handleNavigation("title-dolci");
        }}
        className={
          (activeTitle === "dolci" &&
            "text-white bg-amber-500 px-3 rounded-full") ||
          "px-3"
        }
      >
        dolci
      </div>
    </div>
  );
};

export default HeaderNavbar;
