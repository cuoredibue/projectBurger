import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <div className="bg-white p-1 justify-between items-center flex h-12">
      <div className="flex space-x-2">
        <p className="text-lg text-amber-500 font-semibold">Burger Giusto</p>
        <Link href="/search/cercaArticolo">
          <div className="h-8 w-10 flex justify-center items-center  rounded border border-gray-200 bg-white">
            <SearchIcon className="text-amber-500" fontSize="small" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
