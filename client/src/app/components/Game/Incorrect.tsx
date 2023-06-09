interface Props { 
    selectedResponse: string;    
    setGamePeriod: (value: string) => void;    
};

export default function Incorrect(props: Props) {
    return (
        <div>
            <h2>Incorrect!</h2>
            <h2>{props.selectedResponse}</h2>
            <h2>was a robot's response</h2>
        </div>
    );
};