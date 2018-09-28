let component = ReasonReact.statelessComponent("App");

let make = _children => {
  ...component,
  render: _self =>
    <div>
      {ReasonReact.string("This is the app")}
      <br />
      <Link to_="/page-2"> {ReasonReact.string("Link To Page 2")} </Link>
    </div>,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps => make(jsProps##children));