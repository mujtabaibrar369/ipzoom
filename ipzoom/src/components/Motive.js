import SeePlans from "../buttons/SeePlans";
import "./Motive.css";
const Motive = () => {
  return (
    <div className="motive-div">
      <h3 className="motive">Suitable for projects of any size</h3>
      <div className="line"></div>
      <p className="suitable-para">Whether its a personal project, for a business or enterprise, we have a range of flexible plans to suit your needs.</p>
      <SeePlans></SeePlans>
    </div>
  );
};
export default Motive;
