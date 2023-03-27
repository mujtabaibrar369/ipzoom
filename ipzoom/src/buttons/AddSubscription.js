import { Link } from "react-router-dom";
import "./AddSubscription.css";
const AddSubscription = () => {
  return (
    <div className="add-subscription-div">
      <Link to="/pricing">
        <button className="add-subscription-button" type="submit">
          Add New Subscription
        </button>
      </Link>
    </div>
  );
};
export default AddSubscription;
