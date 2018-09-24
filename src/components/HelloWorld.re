/* HelloWorld.re */
let component = ReasonReact.statelessComponent("HelloWorld");

let make = _children => {
  ...component,
  render: _self => <p> {ReasonReact.string("Hello, World!")} </p>,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps => make(jsProps##children));