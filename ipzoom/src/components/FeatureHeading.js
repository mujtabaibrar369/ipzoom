import "./FeatureHeading.css";
import feature1 from "./feature1.png";
import feature2 from "./feature2.png";
const FeatureHeading = (props) => {
  return (
    <div className="feature-heading-div">
      <div className="container">
        <div className="left-feature-div">
          <img className="feature-image" src={feature1}/>
          <h3>High Quality Flags</h3>
          <p>Automatically return a high quality flag for a particular IP address at a range of size.</p>
        </div>
        <div className="right-feature-div">
          <img className="feature-image" src={feature2}/>
          <h3>Accurate Timezone & Location Data</h3>
          <p>Get more than just location data, Ip Zoom provides accurate timezone, language and currency used in the location of the IP. </p>
        </div>
      </div>
    </div>
  );
};
export default FeatureHeading;
