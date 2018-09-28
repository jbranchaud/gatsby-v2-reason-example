[@bs.module "gatsby-link"] external link: ReasonReact.reactClass = "default";

[@bs.deriving abstract]
type jsProps = {
  [@bs.as "to"]
  to_: string,
};

let make = (~to_, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=link,
    ~props=jsProps(~to_),
    children,
  );