import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import { useRecoilValue } from "recoil";
import { isInstructionModalShow } from "../atoms/instructionAtom";
import InstructionModal from "../components/InstructionModal/InstructionModal";

const Home = () => {
  const isModalShow = useRecoilValue(isInstructionModalShow);
  return (
    <>
      <div className={`${isModalShow ? "" : "hidden"} w-screen h-screen bg-transparent fixed z-10 inset-0 flex items-center justify-center`}>
        <InstructionModal />
      </div>
      <div className={`${isModalShow ? "blur-sm" : ""} bg-black h-screen overflow-hidden min-w-[280px]`}>
        <Head>
          <title>Spotify Clone NextJS 13</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex">
          <Sidebar />
          <Center />
        </main>
        <div className="fixed bottom-0 w-screen">
          <Player />
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
