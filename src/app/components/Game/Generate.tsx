"use client";

import { useState, useEffect, useContext } from "react";
import { PusherContext } from "@/app/context/pusherContext";
import {
  apiRequestNoResponse,
  apiRequestWithResponse,
} from "@/app/utils/apiCalls";
import Loading from "./Loading";
import Main from "./Main";

interface Props {
  setIsError: (value: boolean) => void;
  gameId: string;
  userId: string;
  numRounds: number;
  isLobbyMaster: boolean;
}

export default function Generate(props: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [selfGameData, setSelfGameData] = useState<SingleGameData[]>([]);

  const pusher = useContext(PusherContext);

  useEffect(() => {
    const channel = pusher.subscribe(props.gameId);
    channel.bind(
      "receiveGameData",
      (gameData: { userId: string; data: SingleGameData[] }) => {
        if (gameData.userId === props.userId) {
          setSelfGameData(gameData.data);
          setIsLoading(false);
        }
      }
    );

    return () => {
      channel.unsubscribe();
      channel.unbind(
        "receiveGameData",
        (gameData: { userId: string; data: SingleGameData[] }) => {
          if (gameData.userId === props.userId) {
            setSelfGameData(gameData.data);
            setIsLoading(false);
          }
        }
      );
    };
  });

  useEffect(() => {
    if (!props.isLobbyMaster) {
      return;
    }

    const generate = async () => {
      try {
        const questions = await apiRequestWithResponse(
          "generateQuestions",
          "POST",
          {
            gameId: props.gameId,
          }
        );

        const responses = await apiRequestWithResponse(
          "generateAIResponses",
          "POST",
          { questions: questions }
        );

        await apiRequestNoResponse("addGameData", "POST", {
          questions: questions,
          responses: responses,
          gameId: props.gameId,
        });
        await apiRequestNoResponse("distributeGameData", "POST", {
          gameId: props.gameId,
        });
      } catch (e) {
        props.setIsError(true);
      }
    };

    generate();
  }, []);

  return (
    <section>
      {isLoading ? (
        <Loading />
      ) : (
        <Main
          setIsError={props.setIsError}
          gameId={props.gameId}
          userId={props.userId}
          selfGameData={selfGameData}
          numRounds={props.numRounds}
          isLobbyMaster={props.isLobbyMaster}
        />
      )}
    </section>
  );
}
