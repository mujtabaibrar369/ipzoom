import "./Javascript.css";
const JavaScript = () => {
  const testHandler = () => {
    document.getElementById("test").innerHTML =
      "const apiUrl = `${baseUrl}?api_key=${apiKey}&ip=${ipAddress}`;";
  };
  return (
    <div className="javascriptDiv">
      <button className="javascriptButton" type="submit" onClick={testHandler}>
        Javascript
      </button>
    </div>
  );
};
export default JavaScript;
