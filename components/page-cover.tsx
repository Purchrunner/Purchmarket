﻿import Image from "next/image";
import React from "react";

function PageCover({ rubrik, text, bild }) {
  return (
    <div className="wp-block-cover relative flex w-full items-center">
      <div className="absolute z-40 h-full w-full bg-black bg-opacity-50" />
      <div className="container relative z-40 mx-auto px-8 text-white">
        <h1 className="mb-8 max-w-2xl text-7xl font-black leading-tight">
          {rubrik}
        </h1>
        <p className="max-w-lg text-xl leading-8">{text}</p>
      </div>
      <Image fill className="object-cover" alt="header bild" src={bild} />
    </div>
  );
}

export default PageCover;