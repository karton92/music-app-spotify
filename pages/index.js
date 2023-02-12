import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Music App Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* SIDEBAR */}
        <Sidebar />
        {/* CENTER */}
      </main>
      {/* PLAYER */}
      <div></div>
    </div>
  );
};

export default Home;
