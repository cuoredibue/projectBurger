import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <div className=" p-1 sm:mt-2 mx-4 lg:mx-20 justify-between items-center flex h-12">
      <p className="sm:text-4xl text-lg text-white font-semibold">
        Burger Giusto
      </p>
      <div className="flex space-x-2 justify-center items-center">
        <p className="hidden sm:flex text-lg text-white">cerca</p>
        <Link href="/search/cercaArticolo">
          <div className="h-8 w-10 flex justify-center items-center hover:bg-white rounded border-2 border-white ">
            <SearchIcon
              className="text-white hover:text-amber-500"
              fontSize="small"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
