import Csharp from "../buttons/Csharp";
import Php from "../buttons/Php";
import Java from "../buttons/Java";
import JavaScript from "../buttons/Javascript";
import Python from "../buttons/Python";
import Ruby from "../buttons/Ruby";
import Node from "../buttons/Node";
import "./APIDocs.css";
import Header from "./Header";
import { Link } from "react-router-dom";
const APIDocs = () => {
  const testHandler = () => {
    console.log("test");
  };
  return (
    <div className="apiDocsMain">
      <div className="apiHeader">
        <Header />
      </div>
      <div className="docsContain">
        <div className="headingDocs">
          <h3 className="apiDocument">
            API Documentation in your language of choice.
          </h3>
          <p className="apiDocPara">
            Access all the information you need to build on our API. Our API is
            predictable, resource-oriented URLs, and uses HTTP response codes to
            indicate API errors.
          </p>
        </div>
        <div>
          <Csharp onClick={testHandler} />
          <Python />
          <Java />
          <JavaScript />
          <Php />
          <Ruby />
          <Node />
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default APIDocs;
