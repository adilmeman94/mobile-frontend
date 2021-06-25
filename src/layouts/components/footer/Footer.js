import React from "react";
import ScrollToTop from "react-scroll-up";
import { Button } from "reactstrap";
import { ArrowUp } from "react-feather";
import classnames from "classnames";

const Footer = (props) => {
  let footerTypeArr = ["sticky", "static", "hidden"];
  return (
    <footer
      className={classnames("footer footer-light", {
        "footer-static":
          props.footerType === "static" ||
          !footerTypeArr.includes(props.footerType),
        "d-none": props.footerType === "hidden",
      })}
    >
      <p className="mb-0 clearfix">
        <span className="float-md-right d-none d-md-block">
          COPYRIGHT © {new Date().getFullYear()}
          <span className="text-primary"> UpStrapp, </span>
          All rights reserved
        </span>
      </p>
      {props.hideScrollToTop === false ? (
        <ScrollToTop showUnder={160}>
          <Button color="primary" className="btn-icon scroll-top">
            <ArrowUp size={15} />
          </Button>
        </ScrollToTop>
      ) : null}
    </footer>
  );
};

export default Footer;
