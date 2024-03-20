"use client";

import { apiRequestNoResponse } from "@/app/utils/apiCalls";
import { useState, useEffect } from "react";
import Correct from "./Correct";
import Incorrect from "./Incorrect";

interface Props {
  setIsError: (value: boolean) => void;
  gameId: string;
  userId: string;
  score: number;
  roundNumber: number;
  numRounds: number;
  selectedResponse: string;
  humanResponse: string;
  senderNickname: string;
  setRoundNumber: (value: (value: number) => number) => void;
}

export default function Score(props: Props) {
  const [didUserSubmit, setDidUserSubmit] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(true);
  const [isAnimationsRunning, setIsAnimationsRunning] = useState(true);

  useEffect(() => {
    const reset = async () => {
      if (props.humanResponse === props.selectedResponse) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    };

    setTimeout(() => {
      setIsAnimationsRunning(false);
    }, 1000);

    reset();
  }, []);

  return (
    <>
      {isCorrect ? (
        <Correct
          score={props.score}
          selectedResponse={props.selectedResponse}
          humanResponse={props.humanResponse}
          senderNickname={props.senderNickname}
          didUserSubmit={didUserSubmit}
          handleNextRound={handleNextRound}
        />
      ) : (
        <Incorrect
          score={props.score}
          selectedResponse={props.selectedResponse}
          humanResponse={props.humanResponse}
          senderNickname={props.senderNickname}
          didUserSubmit={didUserSubmit}
          handleNextRound={handleNextRound}
        />
      )}
    </>
  );

  async function handleNextRound() {
    if (isAnimationsRunning) {
      return;
    }

    setDidUserSubmit(true);
    try {
      if (props.roundNumber === props.numRounds) {
        await apiRequestNoResponse("updateScore", "POST", {
          userId: props.userId,
          score: props.score,
        });
        await apiRequestNoResponse("readyCheck", "POST", {
          gameId: props.gameId,
          nextGamePeriod: "endScreen",
        });
        return;
      }

      props.setRoundNumber((prev) => prev + 1);
      await apiRequestNoResponse("readyCheck", "POST", {
        gameId: props.gameId,
        nextGamePeriod: "write",
      });
    } catch (error) {
      props.setIsError(true);
    }
  }
}
