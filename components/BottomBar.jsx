import HomeIcon from "@mui/icons-material/Home";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Link from "next/link";

const BottomBar = () => {
  return (
    <div className="flex place-self-end text-center text-gray-200 h-20 w-full bg-black sticky bottom-0">
      {/* <Link
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
        href="/aboutUs/doveSiamo"
      >
        <div className="flex justify-center  ">
          <MapOutlinedIcon sx={{ fontSize: 40 }} />
        </div>
        <p className=" text-gray-200 text-sm">dove siamo</p>
      </Link>
      <Link
        className="w-1/4 grid justify-center  hover:bg-gray-700/50 -space-y-8 items-center h-full"
        href="/account/myProfile"
      >
        <div className="flex justify-center  ">
          <PermIdentityOutlinedIcon sx={{ fontSize: 40 }} />
        </div>
        <p className=" text-gray-200 text-sm">account</p>
      </Link>
      <Link
        className="w-1/4 grid justify-center  hover:bg-gray-700/50 -space-y-8 items-center h-full"
        href="/payment/checkout"
      >
        <div className="flex justify-center  ">
          <LocalGroceryStoreIcon sx={{ fontSize: 40 }} />
        </div>
        <p className=" text-gray-200 text-sm">Carrello</p>
      </Link> */}
    </div>
  );
};

export default BottomBar;
