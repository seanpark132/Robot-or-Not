interface Props {
    questionArray: string[];
    responseArray: string[];
    score: number;
    roundNumber: number;
    selectedResponse: string;    
    setRoundNumber: (value: ((value:number) => number)) => void;
    setQuestion: (value: string) => void;
    setAiResponse: (value: string) => void;
    setUserResponse: (value: string) => void;
    setGamePeriod: (value: string) => void;    
};

export default function Incorrect(props: Props) {
    function handleNextRound() {        
        if (props.roundNumber === props.questionArray.length) {
            props.setGamePeriod("endScreen");
            return;
        };
        props.setQuestion(props.questionArray[props.roundNumber]);    
        props.setAiResponse(props.responseArray[props.roundNumber - 1]);
        props.setUserResponse("");
        props.setRoundNumber(prev => prev + 1);
        props.setGamePeriod("userResponse");
        return;
    };

    return (
        <div className="flex flex-col items-center">
            <em><p className="text-6xl text-red-500 font-extrabold">Incorrect!</p></em>
            <h2 className="font-normal mt-6">{props.selectedResponse}</h2>
            <h2 className="my-4 text-red-500">was a Robot's response!</h2>
            <h2>Current score: {props.score}</h2>
            <button className="btn-submit" onClick={() => handleNextRound()}>
                Next Round
            </button>                      
        </div>
    );
};