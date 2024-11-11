import { Button } from "react-bootstrap"; 

const ConfirmButton = ({onClick, label}) => {  
    return (
        <div className="section confirm">
            <Button onClick={onClick}>{label}</Button>
        </div>
    )
};
export default ConfirmButton;
