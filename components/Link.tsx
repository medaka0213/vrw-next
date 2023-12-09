import React, { VFC } from "react";
import NextLink from "next/link";
import { BoxProps } from "@mui/system";

import LaunchIcon from "@mui/icons-material/Launch";

export type LinkProps = BoxProps & {
  href: string | { pathname: string; query: any };
  external?: boolean;
};

const iconWrapStyle = {
  display: "inline-flex",
  VerticalAlign: "text-bottom",
  BoxSizing: "inherit",
  textAlign: "center",
  AlignItems: "center",
};

export const Link = ({ sx, children, href, external = false }: LinkProps) => {
  let props: any = {
    href,
    style: { ...iconWrapStyle, ...sx },
  };
  if (external) {
    props = { ...props, target: "_blank" };
  }
  return (
    <NextLink {...props}>
      {children || href}
      {external && (
        <LaunchIcon
          sx={{
            fontSize: "0.8rem",
            ml: 0.25,
            mt: 0.5,
          }}
        />
      )}
    </NextLink>
  );
};

export default Link;
