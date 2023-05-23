import "./Php.css";
const Php = () => {
  const test = () => {
    document.getElementById("test").innerHTML =
      '$apiUrl = $baseUrl . "?api_key=" . urlencode($apiKey) . "&ip=" . urlencode($ipAddress);';
  };
  return (
    <div className="phpDiv">
      <button className="phpButton" type="submit" onClick={test}>
        Php
      </button>
    </div>
  );
};
export default Php;
