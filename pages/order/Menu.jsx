import Link from "next/link";

import ItemList from "../../components/ItemList";
import FoodCard from "../../components/FoodCard";
import HomeIcon from "@mui/icons-material/Home";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SearchIcon from "@mui/icons-material/Search";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import SportsBarOutlinedIcon from "@mui/icons-material/SportsBarOutlined";
import IcecreamOutlinedIcon from "@mui/icons-material/IcecreamOutlined";

const Menu = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <div className=" sticky bg-black top-0 mx-4 pt-20 ">
        <p className="text-3xl  text-gray-400">Qual'è il tuo</p>
        <h1 className="text-4xl  text-gray-100">burger preferito?</h1>
        <input
          className="h-12 bg-gray-700/50 w-full rounded mt-8"
          type="text"
          placeholder="   Search"
        />
        <div className="mt-6 flex justify-between w-full  ">
          <div className="p-2 bg-gray-700/50 text-sm h-16 w-16  -space-y-2 flex flex-wrap justify-center items-center  rounded-full">
            <LunchDiningOutlinedIcon
              className="text-gray-200"
              sx={{ fontSize: 30 }}
            />
            <p className="text-gray-200">burger</p>
          </div>

          <div className="p-2 bg-gray-700/50 text-sm h-16 w-16  -space-y-2 flex flex-wrap justify-center items-center  rounded-full">
            <FastfoodOutlinedIcon
              className="text-gray-200"
              sx={{ fontSize: 30 }}
            />
            <p className="text-gray-200">menu</p>
          </div>

          <div className="p-2 bg-gray-700/50 text-sm h-16 w-16  -space-y-2 flex flex-wrap justify-center items-center  rounded-full">
            <SportsBarOutlinedIcon
              className="text-gray-200"
              sx={{ fontSize: 30 }}
            />
            <p className="text-gray-200">birre</p>
          </div>

          <div className="p-2 bg-gray-700/50 text-sm h-16 w-16  -space-y-2 flex flex-wrap justify-center items-center  rounded-full">
            <IcecreamOutlinedIcon
              className="text-gray-200"
              sx={{ fontSize: 30 }}
            />
            <p className="text-gray-200">dolci</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 bg-black px-4">
        {ItemList.map((item, index) => {
          const { name, img, price, ingredients } = item;
          return (
            <FoodCard
              key={index}
              name={name}
              img={img}
              price={price}
              ingredients={ingredients}
            />
          );
        })}
      </div>
      <div className="flex text-center text-gray-200 h-20 w-full bg-black sticky bottom-0">
        <Link
          className="w-1/4 grid justify-center hover:bg-gray-700/50 -space-y-8 items-center h-full "
          href="/"
        >
          <div className="flex justify-center  ">
            <HomeIcon sx={{ fontSize: 40 }} />
          </div>
          <p className=" text-gray-200 text-sm">Home</p>
        </Link>
        <Link
          className="w-1/4 grid justify-center  hover:bg-gray-700/50 -space-y-8 items-center h-full"
          href="/"
        >
          <div className="flex justify-center  ">
            <SearchIcon sx={{ fontSize: 40 }} />
          </div>
          <p className=" text-gray-200 text-sm">cerca</p>
        </Link>
        <Link
          className="w-1/4 grid justify-center  hover:bg-gray-700/50 -space-y-8 items-center h-full"
          href="/"
        >
          <div className="flex justify-center  ">
            <StorefrontIcon sx={{ fontSize: 40 }} />
          </div>
          <p className=" text-gray-200 text-sm">Shop</p>
        </Link>
        <Link
          className="w-1/4 grid justify-center  hover:bg-gray-700/50 -space-y-8 items-center h-full"
          href="/"
        >
          <div className="flex justify-center  ">
            <LocalGroceryStoreIcon sx={{ fontSize: 40 }} />
          </div>
          <p className=" text-gray-200 text-sm">Carrello</p>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
