import AbuserIp from "../buttons/AbuserIp";
import AttackerIp from "../buttons/AttackerIp";
import DummyIp from "../buttons/DummyIp";
import YourIpAddress from "../buttons/YourIpAddress";
import search from "./search.png";
import "./IpInfo.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  useEffect(() => {
    retrieveIpInformation();
  }, []);
  return (
    <div className="ip_info">
      <div className="search_bar">
        <div>
          <input type="text" placeholder="192.168.1.1" className="search-div" />
        </div>
        <a href="#">
          <div className="search_icon_div">
            <img className="search" src={search} />
          </div>
        </a>
      </div>
      <div className="information">
        <p>ip_address: "{ip}"</p>
        <p>city: "{city}"</p>
        <p>continent_code: "{continentCode}"</p>
        <p>continent_name: "{continentName}"</p>
        <p>country_name: "{countryName}"</p>
        <p>country_capital: "{countryCapital}"</p>
        <p>country_code2: "{countryCode}"</p>
        <p>currency: "{currency}"</p>
        <p>languages: "{languages}"</p>
        <p>latitude: "{latitude}"</p>
        <p>longitude: "{longitude}"</p>
        <p>organization: "{organization}"</p>
        <p>timezone: "{timeZone}"</p>
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
