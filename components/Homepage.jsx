import logo from "../images/burger.png";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 bg-gradient-to-b from-amber-400 to-amber-300 content-center h-screen">
      <div className="flex justify-center">
        <Image alt="burger-image" src={logo} width={200} height={200} />
      </div>
      <div className="text-center space-y-4">
        <h1 className="text-amber-800 font-semibold mx-16 text-4xl">
          Burger giusto!
        </h1>
        <p className="text-amber-800 leading-8 mx-16">
          scopri diversi sapori e gustateli in qualsiasi momento
        </p>
        <Link href="/orderNow/menuCompleto">
          <button className="text-gray-100  bg-amber-500 mt-4 p-6 rounded-full">
            <svg
              width="30"
              height="30"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};
export default HomePage;
