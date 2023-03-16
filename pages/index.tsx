import type { NextPage } from "next";

import HomePage from "../components/Homepage";

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <HomePage />
    </div>
  );
};

export default Home;
