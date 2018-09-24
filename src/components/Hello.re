let component = ReasonReact.statelessComponent("Hello");

let make = (~name, _children) => {
    ...component,
    render: _self => <p>{ReasonReact.string("Hello, ")}{ReasonReact.string(name)}</p>
};

[@bs.deriving abstract]
type jsProps = {
  name: string,
};

let default = ReasonReact.wrapReasonForJs(~component, jsProps =>
                                          make(~name=jsProps->nameGet, [||],));
