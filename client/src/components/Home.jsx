import React from "react";
import QRCode from "qrcode.react";
import purpletrex from "../assets/purple-t-rex.png";

const Home = ({ user }) => {
  const logoSettings = {
    src: purpletrex,
    height: 64,
    width: 64,
  };

  return (
    <>
      <div>Home Page Placeholder</div>
      <QRCode
        value={"https://www.example.com"}
        size={256}
        level="H"
        includeMargin={true}
        imageSettings={logoSettings}
      />
    </>
  );
};

export default Home;
