interface Props {
    selectedResponse: string;    
    setGamePeriod: (value: string) => void;    
};

export default function Correct(props: Props) {
    function handleNextRound() {
        
    };

    return (
        <div className="flex flex-col items-center">
            <h2>Correct!</h2>
            <h2>{props.selectedResponse}</h2>
            <h2>was a human's response</h2>
            <button className="btn-submit">
                Next Round
            </button>
        </div>
    );
};