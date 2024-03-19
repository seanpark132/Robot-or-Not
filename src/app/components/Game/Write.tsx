"use client";

import { useState, useEffect } from "react";
import {cloneDeep} from "lodash";
import {
	randomizeSendToUserIds,
	randomizedToFalse,
	readyCheck,
	sendSelectData,
	updateUserResponse,
} from "@root/lib/utils";

interface Props {
	setIsError: (value: boolean) => void;
	gameId: string;
	userId: string;
	selfGameData: SingleGameData[];
	roundNumber: number;
	isLobbyMaster: boolean;
}

export default function Write(props: Props) {
	const [inputUserResponse, setInputUserResponse] = useState("");
	const [didUserSubmit, setDidUserSubmit] = useState(false);
	const [currentRoundData, setCurrentRoundData] = useState<SingleGameData>({
		id: 0,
		question: "",
		aiResponse: "",
		userResponse: "",
		gameId: "",
		userId: "",
	});
	const [isAnimationsRunning, setIsAnimationsRunning] = useState(true);

	useEffect(() => {
		setCurrentRoundData(props.selfGameData[props.roundNumber - 1]);

		const reset = async () => {
			try {
				if (props.isLobbyMaster) {
					await randomizedToFalse(props.gameId);
				}
			} catch (error) {
				props.setIsError(true);
			}
		};

		setTimeout(() => {
			setIsAnimationsRunning(false);
		}, 3000);

		reset();
	}, []);

	return (
		<>
			{currentRoundData.id !== 0 && (
				<div className="flex flex-col">
					<h2 className="fade-in">Question:</h2>
					<p className="fade-in">{currentRoundData.question}</p>
					<h2 className="mt-6 fade-in-1">Robot Response:</h2>
					<p className="mb-6 fade-in-1">
						{currentRoundData.aiResponse}
					</p>
					<label htmlFor="humanResponse" className="fade-in-2">
						Your Response:
					</label>
					<textarea
						className="input-human-response fade-in-2"
						id="humanResponse"
						value={inputUserResponse}
						onChange={(e) => {
							if (!didUserSubmit) {
								setInputUserResponse(e.target.value);
							}
						}}
					/>
					{didUserSubmit ? (
						<h1 className="mt-8 py-2 px-4 self-center text-center">
							Waiting for others...
						</h1>
					) : (
						<button
							className="btn-submit fade-in-2"
							onClick={() => handleSubmit()}
						>
							Submit
						</button>
					)}
				</div>
			)}
		</>
	);

	async function handleSubmit() {
		if (isAnimationsRunning) {
			return;
		}

		if (inputUserResponse === currentRoundData.aiResponse) {
			alert(
				"You cannot write a response that is exactly the same as the robot's :["
			);
			return;
		}

		if (inputUserResponse.length < 1) {
			alert("Please enter a response with at least 1 word");
			return;
		}

		setDidUserSubmit(true);

		let deepClone = cloneDeep(props.selfGameData);
		deepClone[props.roundNumber - 1].userResponse = inputUserResponse;
		const selectData = deepClone[props.roundNumber - 1];

		try {
			await randomizeSendToUserIds(props.gameId);
			await sendSelectData(props.gameId, props.userId, selectData);
			await updateUserResponse(currentRoundData.id, inputUserResponse);
			await readyCheck(props.gameId, "select");
		} catch (error) {
			props.setIsError(true);
		}
	}
}
