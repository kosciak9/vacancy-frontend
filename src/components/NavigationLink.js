/** @jsx jsx */
import { jsx } from "@emotion/core";
import theme from "common/theme";
import { Link, useRoute } from "wouter";

export default function NavigationLink(props) {
  const { href, children } = props;
  const [isActive] = useRoute(href);

  return (
    <Link {...props}>
      <a
        className={isActive ? "active" : ""}
        href={href}
        css={{
          fontWeight: 700,
          padding: theme.spacing(2),
          paddingTop: theme.spacing(3),
          paddingBottom: theme.spacing(3),
          borderRadius: 2,
          border: "none",
          color: "black",
          "&.active": {
            backgroundColor: theme.palette.success
          }
        }}
      >
        {children}
      </a>
    </Link>
  );
}
