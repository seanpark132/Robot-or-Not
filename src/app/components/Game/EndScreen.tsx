"use client";

import { apiRequestWithResponse } from "@/app/utils/apiCalls";
import { useState, useEffect } from "react";

interface Props {
  gameId: string;
}

interface UserData {
  id: string;
  nickname: string;
  score: number;
  gameId: string;
  sendToUserId: string | null;
}

export default function EndScreen(props: Props) {
  const [allUserData, setAllUserData] = useState<UserData[]>([]);

  useEffect(() => {
    const getAllUserData = async () => {
      const data: UserData[] = await apiRequestWithResponse(
        "getAllUsers",
        "POST",
        { gameId: props.gameId }
      );
      data.sort((a, b) => b.score - a.score);
      setAllUserData(data);
    };

    getAllUserData();
  }, []);

  return (
    <>
      {allUserData.length > 0 && (
        <div className="text-center fade-in">
          <h2 className="text-5xl">Game over!</h2>
          <div className="border-4 border-yellow-500 rounded-xl mt-6">
            <h1 className="border-b-4 border-yellow-500 py-3">SCOREBOARD</h1>
            {allUserData.map((userData: UserData) => (
              <div key={userData.id} className="m-3 px-2 flex">
                <h2 className="scoreboard-name">{userData.nickname}</h2>
                <h2 className="ml-auto">{userData.score}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
