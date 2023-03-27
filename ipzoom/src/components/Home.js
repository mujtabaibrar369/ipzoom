import bgVideo from "./video.mp4";
import Header from "./Header";
import Slogan from "./Slogan";
import IpInfoBack from "./IpInfoBack";
import IpInfo from "./IpInfo";
import FeatureHeading from "./FeatureHeading";
import Motive from "./Motive";
import Footer from "./Footer";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
  return (
    <div className="main">
      <video className="videoTag" autoPlay loop muted>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="headerDiv">
        <Header />
        <Slogan />
      </div>
      <IpInfoBack></IpInfoBack>
      <IpInfo></IpInfo>
      <FeatureHeading></FeatureHeading>
      <Motive></Motive>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
}
export default Home;
