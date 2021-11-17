import React from "react";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

import "./footer.component.style.css";

export const Footer = () => {
  return (
    <>
      <div className="container-fluid text-dark cont">
        <div className="row pt-3">
          <div className="col-12">
            <h4 className="text-center py-3 text-contact">Contáctanos</h4>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-5">
            <a className="p-2" target="_blank" href="https://www.facebook.com/">
              <FacebookIcon sx={{ color: "#7e57c2" }} />
              Facebook
            </a>
            |
            <a
              className="p-2"
              target="_blank"
              href="https://www.instagram.com/"
            >
              <InstagramIcon sx={{ color: "#7e57c2" }} />
              Instagram
            </a>
            |
            <a
              className="p-2"
              target="_blank"
              href="https://www.instagram.com/"
            >
              <EmailIcon sx={{ color: "#7e57c2" }} />
              newhopes@gmail.com
            </a>
            |
            <a
              className="p-2"
              target="_blank"
              href="https://www.instagram.com/"
            >
              <LocalPhoneIcon sx={{ color: "#7e57c2" }} />
              +54 9 3512000068
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h6 className="py-3 text-center">
              Copyright
              <a
                href="https://www.linkedin.com/in/ignacio-mansilla-gomez-3502551a3/"
                target="_blank"
              >
                @IgnacioMansilla
              </a>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};
