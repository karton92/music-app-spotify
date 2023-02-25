import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Music App Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      {/* PLAYER */}
      <div></div>
    </div>
  );
};

export default Home;
