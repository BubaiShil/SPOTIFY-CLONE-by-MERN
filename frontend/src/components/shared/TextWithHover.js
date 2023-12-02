import { useNavigate } from "react-router-dom";

const TextWithHover = ({ displayText, active }) => {
    //const navigate = useNavigate()
    return (
        <div className="flex items-center justify-start cursor-pointer">
            <div className={`${active?"text-white" : "text-gray-500"} font-semibold hover:text-white text-lg`}>
                {displayText}
            </div>
           
        </div>
    );
};

export default TextWithHover;