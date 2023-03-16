import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <div className="bg-gray-700 p-1 justify-between items-center flex h-12">
      <div className="flex space-x-2">
        <p className="text-lg text-white font-semibold">Burger Giusto</p>
        <Link href="/search/cercaArticolo">
          <div className="h-8 w-10 flex justify-center items-center  rounded border border-gray-400 bg-gray-100">
            <SearchIcon fontSize="small" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
