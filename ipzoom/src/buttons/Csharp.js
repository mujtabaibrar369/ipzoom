import "./Csharp.css";
const Csharp = () => {
  const test = () => {
    document.getElementById("test").innerHTML =
      'string apiUrl = $"{baseUrl}?api_key={apiKey}&ip={ipAddress}";';
  };
  return (
    <div className="csharpDiv">
      <button className="csharpButton" type="submit" onClick={test}>
        C#
      </button>
    </div>
  );
};
export default Csharp;
