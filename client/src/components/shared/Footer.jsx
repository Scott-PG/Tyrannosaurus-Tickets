import React from "react";
import { Link } from "react-router-dom";
import homeBright from "../../assets/tab bar/home-bright.png";
import homeDark from "../../assets/tab bar/home-dark.png";
import walletBright from "../../assets/tab bar/wallet-bright.png";
import walletDark from "../../assets/tab bar/wallet-dark.png";

const Footer = ({ page }) => {
  const homeOptions = (
    <>
      <img src={homeBright} alt="Home" />
      <Link to="/events">
        <img src={walletDark} alt="Wallet" />
      </Link>
    </>
  );
  const walletOptions = (
    <>
      <Link to="/">
        <img src={homeDark} alt="Home" />
      </Link>
      <img src={walletBright} alt="Wallet" />
    </>
  );

  let currentOptions;
  if (page === "home") {
    currentOptions = homeOptions;
  } else if (page === "wallet") {
    currentOptions = walletOptions;
  }

  return <footer>{currentOptions}</footer>;
};

export default Footer;
