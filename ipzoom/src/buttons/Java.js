import "./Java.css";
const Java = () => {
  const testHandler = () => {
    document.getElementById("test").innerHTML =
      'String apiUrl = baseUrl + "?api_key=" + apiKey + "&ip=" + ipAddress;';
  };
  return (
    <div className="javaDiv">
      <button className="javaButton" type="submit" onClick={testHandler}>
        Java
      </button>
    </div>
  );
};
export default Java;
