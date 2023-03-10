import type { NextPage } from "next";

import HomePage from "../components/Homepage";

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <HomePage />
    </div>
  );
};

export default Home;
