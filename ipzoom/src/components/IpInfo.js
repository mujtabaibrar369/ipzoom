import AbuserIp from "../buttons/AbuserIp";
import AttackerIp from "../buttons/AttackerIp";
import DummyIp from "../buttons/DummyIp";
import YourIpAddress from "../buttons/YourIpAddress";
import search from "./search.png";
import "./IpInfo.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const IpInfo = () => {
  const [ip, setIp] = useState("");
  const [city, setCity] = useState("");
  const [continentCode, setContinentCode] = useState("");
  const [continentName, setContinentName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCapital, setCountryCapital] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [currency, setCurrency] = useState("");
  const [languages, setLanguages] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [organization, setOrganization] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [ipToSearch, setIpToSearch] = useState("");
  const getIpInfo = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/users/checkUserIp"
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
  const retrieveIpInformation = async () => {
    const ipInformation = await getIpInfo();
    const ip = ipInformation.ip;
    const city = ipInformation.city;
    const continentCode = ipInformation.continent_code;
    const continentName = ipInformation.continent_name;
    const countryName = ipInformation.country_name;
    const countryCapital = ipInformation.country_capital;
    const countryCode = ipInformation.country_code2;
    const Currency = ipInformation.currency.name;
    const Languages = ipInformation.languages;
    const Latitude = ipInformation.latitude;
    const Longitude = ipInformation.longitude;
    const Organization = ipInformation.organization;
    const timeZone = ipInformation.time_zone.name;
    setIp(ip);
    setCity(city);
    setContinentCode(continentCode);
    setContinentName(continentName);
    setCountryName(countryName);
    setCountryCapital(countryCapital);
    setCountryCode(countryCode);
    setCurrency(Currency);
    setLanguages(Languages);
    setLatitude(Latitude);
    setLongitude(Longitude);
    setOrganization(Organization);
    setTimeZone(timeZone);
    console.log(ipInformation);
  };
  const searchInputHandler = (e) => {
    setIpToSearch(e.target.value);
  };

  const searchHandler = async () => {
    console.log(ipToSearch);
    const ipdata = await axios.get(
      `http://localhost:5000/api/users/searchUserIp/${ipToSearch}`
    );
    console.log(ipdata);
  };
  useEffect(() => {
    retrieveIpInformation();
  }, []);
  return (
    <div className="ip_info">
      <div className="search_bar">
        <div>
          <input
            type="text"
            placeholder="192.168.1.1"
            className="search-div"
            name="ip"
            onChange={searchInputHandler}
          />
        </div>
        <a href="#">
          <div className="search_icon_div">
            <img className="search" src={search} onClick={searchHandler} />
          </div>
        </a>
      </div>
      <div className="information">
        <p className="curly-brace">{"{"}</p>
        <p className="info">
          ip_address: "{ip}",<br></br>
          city: "{city}",<br></br>
          continent_code: "{continentCode}",<br></br>
          continent_name: "{continentName}",<br></br>
          country_name: "{countryName}",<br></br>
          country_capital: "{countryCapital}",<br></br>
          country_code: "{countryCode}",<br></br>
          currency: "{currency}",<br></br>
          languages: "{languages}",<br></br>
          latitude: "{latitude}",<br></br>
          longitude: "{longitude}",<br></br>
          organization: "{organization}",<br></br>
          timezone: "{timeZone}"
        </p>
        <p className="curly-brace">{"}"}</p>
      </div>
      <div className="search_ip_buttons">
        <YourIpAddress></YourIpAddress>
        <DummyIp></DummyIp>
        <AttackerIp></AttackerIp>
        <AbuserIp></AbuserIp>
      </div>
    </div>
  );
};
export default IpInfo;
