import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { isInstructionModalShow } from "../../atoms/instructionAtom";
import { XIcon } from "@heroicons/react/outline";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { shuffle } from "lodash";

const stepsData = [
  {
    title: "Włącz oryginalne urządzenie",
    text: (
      <>
        <span>
          Aby korzystać z aplikacji należy spełnić wymagania narzucone przez <span className="text-green-500">API Spotify</span>:
        </span>
        <br />
        <span>1. Włącz oryginalne urządzenie w przeglądarce, aplikacji mobilnej lub wersji desktopowej.</span>
        <br />
        <span>
          2. Miej aktywne <span className="text-green-500">Premium Spotify</span>, które jest wymagane, aby móc swobodnie korzystać z tej aplikacji.
        </span>
      </>
    ),
    image: "https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2023/12/52862274326_3f14319606_o.jpg",
  },
  {
    title: "Aktywuj Spotify",
    text: (
      <>
        <span>Aby aplikacja mogła działać musi zostać wykryte oryginalne urządzenie. W tym celu:</span>
        <br />
        <span>
          1. Wyszukaj dowolny utwór muzyczny na swoim oryginalnym urządzeniu <span className="text-green-500">Spotify</span> i kliknij przycisk play,
          tak aby oryginalne urządzenie się aktywowało.
        </span>
        <br />
        <span>2. Kliknij pauze i zatrzymaj utwór - teraz urządzenie jest już aktywne i zostanie wykryte. Zminimalizuj, lecz nie wyłączaj go.</span>
        <br />
        <span>3. Przejdz do aplikacji testowej.</span>
      </>
    ),
    image: "https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2022/08/Spotify-shuffle-button.png",
  },
  {
    title: "Wystartuj z muzyką",
    text: (
      <div className="h-full flex flex-col justify-start items-center pt-12 text-center">
        <span className="text-7xl uppercase font-bold max-sm:text-5xl">Brawo!</span>
        <br />
        <span className="text-4xl uppercase max-sm:text-2xl">
          Korzystaj z <span className="text-green-500 font-bold">aplikacji</span> na całego!
        </span>
      </div>
    ),
    image: "https://routenote.com/blog/wp-content/uploads/2021/11/Blog_Promo_Cards4.png",
  },
];
const colors = ["from-gray-600"];

const InstructionModal = () => {
  const [isModalShow, setIsModalShow] = useRecoilState(isInstructionModalShow);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  const resetInstructionModal = () => {
    setIsModalShow(false);
    setActiveStep(0);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    console.log(activeStep);
    console.log(stepsData.lenght);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="backdrop-blur-sm text-white w-3/4 h-3/4 bg-gray-500 rounded-xl p-[2px]">
      <div className={`rounded-xl p-3 h-full bg-gradient-to-b to-black ${color} flex flex-col`}>
        <header>
          <button onClick={() => resetInstructionModal()} className="h-[50px] w-full flex justify-end items-center mb-3 max-sm:mb-0">
            <XIcon className="h-10 w-10 text-white" />
          </button>
          <Stepper
            className="text-white max-[600px]:hidden"
            activeStep={activeStep}
            sx={{
              circle: {
                color: "rgb(34 197 94)",
              },
              svg: {
                height: "26px",
                width: "26px",
              },
              ".MuiStepIcon-text": {
                fontSize: "1rem",
                fontWeight: "bold",
                color: "grey",
              },
              ".Mui-completed": {
                color: "rgb(34 197 94)",
              },
            }}
          >
            {stepsData.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <div className="text-xl">
                    <StepLabel {...labelProps}>
                      <span className="text-white text-1xl uppercase font-bold">{label.title}</span>
                    </StepLabel>
                  </div>
                </Step>
              );
            })}
          </Stepper>
        </header>

        <main className="text-white h-full flex mt-4 max-[768px]:flex-col">
          <span className="min-[600px]:hidden text-2xl max-sm:text-xl text-center font-bold uppercase bg-green-600 text-white rounded-xl p-2">
            {stepsData[activeStep].title}
          </span>
          <Typography
            className="w-full md:w-3/5 text-lg pr-2 uppercase max-[1380px]:text-base max-[1000px]:text-[0.7rem] max-sm:text-xs max-sm:text-left flex flex-col justify-center"
            sx={{ m: 1, mt: 2 }}
          >
            {stepsData[activeStep].text}
          </Typography>
          <div className="w-full md:w-2/5 h-full max-sm:hidden">
            <img className="h-full object-cover rounded-3xl p-2" src={stepsData[activeStep].image} alt="" />
          </div>
        </main>
        <footer>
          <Box className=" justify-self-end" sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              className="text-xl"
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                "&.Mui-disabled": {
                  color: "gray",
                },
              }}
            >
              Wróć
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              className="text-xl"
              color="inherit"
              disabled={activeStep === 2}
              onClick={handleNext}
              sx={{
                "&.Mui-disabled": {
                  color: "gray",
                },
              }}
            >
              Dalej
            </Button>
          </Box>
        </footer>
      </div>
    </div>
  );
};

export default InstructionModal;
