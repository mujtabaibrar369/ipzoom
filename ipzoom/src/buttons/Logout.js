import "./logout.css";
const Logout = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/logout";
  };

  return (
    <div className="logoutDiv">
      <button className="logoutButton" type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
export default Logout;
