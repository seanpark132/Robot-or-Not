"use client";

import Write from "./Write";
import Select from "./Select";
import Score from "./Score";
import EndScreen from "./EndScreen";
import { useState, useEffect, useContext } from "react";
import { PusherContext } from "@/app/lib/pusherContext";

interface Props {
	setIsError: (value: boolean) => void;
	gameId: string;
	userId: string;
	selfGameData: SingleGameData[];
	numRounds: number;
	isLobbyMaster: boolean;
}

export default function Main(props: Props) {
	const [gamePeriod, setGamePeriod] = useState("write");
	const [score, setScore] = useState(0);
	const [roundNumber, setRoundNumber] = useState(1);
	const [selectQuestion, setSelectQuestion] = useState("");
	const [selectResponse1, setSelectResponse1] = useState("");
	const [selectResponse2, setSelectResponse2] = useState("");
	const [selectedResponse, setSelectedResponse] = useState("");
	const [humanResponse, setHumanResponse] = useState("");
	const [senderNickname, setSenderNickName] = useState("");

	const pusher = useContext(PusherContext);

	useEffect(() => {
		const channel = pusher.subscribe(props.gameId);
		channel.bind(
			"receiveSelectData",
			(data: {
				receiverId: string;
				nickname: string;
				selectData: SingleGameData;
			}) => {
				if (data.receiverId === props.userId) {
					setSelectQuestion(data.selectData.question);
					setHumanResponse(data.selectData.userResponse!);
					setSenderNickName(data.nickname);
					const zeroOrOne = Math.floor(Math.random() * 2);

					if (zeroOrOne === 0) {
						setSelectResponse1(data.selectData.aiResponse);
						setSelectResponse2(data.selectData.userResponse!);
					} else {
						setSelectResponse2(data.selectData.aiResponse);
						setSelectResponse1(data.selectData.userResponse!);
					}
				}
			}
		);

		channel.bind("allReady", async (nextGamePeriod: string) => {
			setGamePeriod(nextGamePeriod);
		});

		return () => {
			channel.unsubscribe();

			channel.unbind(
				"receiveSelectData",
				(data: {
					receiverId: string;
					nickname: string;
					selectData: SingleGameData;
				}) => {
					if (data.receiverId === props.userId) {
						setSelectQuestion(data.selectData.question);
						setHumanResponse(data.selectData.userResponse!);
						setSenderNickName(data.nickname);
						const zeroOrOne = Math.floor(Math.random() * 2);

						if (zeroOrOne === 0) {
							setSelectResponse1(data.selectData.aiResponse);
							setSelectResponse2(data.selectData.userResponse!);
						} else {
							setSelectResponse2(data.selectData.aiResponse);
							setSelectResponse1(data.selectData.userResponse!);
						}
					}
				}
			);

			channel.unbind("allReady", async (nextGamePeriod: string) => {
				setGamePeriod(nextGamePeriod);
			});
		};
	}, []);

	return (
		<div>
			{gamePeriod === "write" && (
				<Write
					setIsError={props.setIsError}
					gameId={props.gameId}
					userId={props.userId}
					selfGameData={props.selfGameData}
					roundNumber={roundNumber}
					isLobbyMaster={props.isLobbyMaster}
				/>
			)}
			{gamePeriod === "select" && (
				<Select
					setIsError={props.setIsError}
					gameId={props.gameId}
					userId={props.userId}
					selectQuestion={selectQuestion}
					selectResponse1={selectResponse1}
					selectResponse2={selectResponse2}
					selectedResponse={selectedResponse}
					humanResponse={humanResponse}
					senderNickname={senderNickname}
					setSelectedResponse={setSelectedResponse}
					setScore={setScore}
					setGamePeriod={setGamePeriod}
				/>
			)}
			{gamePeriod === "score" && (
				<Score
					setIsError={props.setIsError}
					gameId={props.gameId}
					userId={props.userId}
					score={score}
					roundNumber={roundNumber}
					numRounds={props.numRounds}
					selectedResponse={selectedResponse}
					humanResponse={humanResponse}
					senderNickname={senderNickname}
					setRoundNumber={setRoundNumber}
				/>
			)}
			{gamePeriod === "endScreen" && <EndScreen gameId={props.gameId} />}
		</div>
	);
}
