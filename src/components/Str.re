let component = ReasonReact.statelessComponent("Str");

let make = (~s, _children) => {
  ...component,
  render: _self => <> {ReasonReact.string(s)} </>,
};