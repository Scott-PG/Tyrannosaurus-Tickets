import React from "react";
import QRCode from "qrcode.react";
import test from "../assets/purple-t-rex.png";

const Home = () => {
  const logoSettings = {
    src: test,
    height: 64,
    width: 64,
  };

  return (
    <>
      <div>Home Page Placeholder</div>
      <QRCode
        value="https://www.example.com"
        size={256}
        level="H"
        includeMargin={true}
        imageSettings={logoSettings}
      />
    </>
  );
};

export default Home;
