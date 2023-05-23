import "./Node.css";
const Node = () => {
  const test = () => {
    document.getElementById("test").innerHTML =
      "const apiUrl = `${baseUrl}?api_key=${apiKey}&ip=${ipAddress}`";
  };
  return (
    <div className="nodeDiv">
      <button className="nodeButton" type="submit" onClick={test}>
        Node js
      </button>
    </div>
  );
};
export default Node;
