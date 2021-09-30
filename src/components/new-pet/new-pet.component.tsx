import React, { PureComponent } from "react";
import { GoBack } from "../go-back/go-back.component";

import { Header } from "../header/header.component";

export const NewPet = () => {
  return (
    <>
      <Header />
      <p>New Pet</p>
      <form></form>
      <GoBack />
    </>
  );
};
