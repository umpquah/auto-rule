import { Spinner as BootstrapSpinner } from "react-bootstrap";

const Spinner = ({ visible }) => {  
    return (
        visible &&
        <div className="section">
          <BootstrapSpinner animation="border" />
        </div>
    );
};
  
export default Spinner;

