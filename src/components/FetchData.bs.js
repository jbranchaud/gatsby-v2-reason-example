// Generated by BUCKLESCRIPT VERSION 4.0.5, PLEASE EDIT WITH CARE
'use strict';

var Str = require("./Str.bs.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function responseInfo(json) {
  var url = Json_decode.field("prev", Json_decode.string, json);
  var tmp = url === "" ? undefined : url;
  var url$1 = Json_decode.field("next", Json_decode.string, json);
  var tmp$1 = url$1 === "" ? undefined : url$1;
  return /* record */[
          /* prevPageUrl */tmp,
          /* nextPageUrl */tmp$1
        ];
}

function character(json) {
  return /* record */[
          /* id */Json_decode.field("id", Json_decode.$$int, json),
          /* name */Json_decode.field("name", Json_decode.string, json),
          /* status */Json_decode.field("status", Json_decode.string, json),
          /* species */Json_decode.field("species", Json_decode.string, json),
          /* imageUrl */Json_decode.field("image", Json_decode.string, json)
        ];
}

function characters(json) {
  return Json_decode.list(character, json);
}

function results(json) {
  return /* record */[
          /* results */Json_decode.field("results", characters, json),
          /* info */Json_decode.field("info", responseInfo, json)
        ];
}

var Decode = /* module */[
  /* responseInfo */responseInfo,
  /* character */character,
  /* characters */characters,
  /* results */results
];

function fetchCharacters() {
  return fetch("/api/character/").then((function (prim) {
                    return prim.json();
                  })).then((function (json) {
                  return Promise.resolve(results(json));
                })).catch((function () {
                return Promise.resolve(undefined);
              }));
}

function fetchPage(pageUrl, self) {
  var parts = pageUrl.split("rickandmortyapi.com");
  var apiUrl = List.nth($$Array.to_list(parts), 1);
  fetch(apiUrl).then((function (prim) {
                return prim.json();
              })).then((function (json) {
              return Promise.resolve(results(json));
            })).catch((function () {
            return Promise.resolve(undefined);
          })).then((function (result) {
          if (result !== undefined) {
            var rickAndMortyResponse = result;
            var characters = rickAndMortyResponse[/* results */0];
            Curry._1(self[/* send */3], /* SetCharacters */Block.__(0, [characters]));
            return Promise.resolve(Curry._1(self[/* send */3], /* SetResponseInfo */Block.__(1, [rickAndMortyResponse[/* info */1]])));
          } else {
            return Promise.resolve(Curry._1(self[/* send */3], /* SetLoadingFailed */Block.__(2, ["Failed to load some characters."])));
          }
        }));
  return /* () */0;
}

function listCharacters(characters) {
  if (characters) {
    return React.createElement("ul", {
                className: "character-list"
              }, $$Array.of_list(List.map((function (character) {
                          return React.createElement("li", {
                                      key: String(character[/* id */0])
                                    }, React.createElement("div", {
                                          className: "character-card"
                                        }, React.createElement("img", {
                                              className: "character-img",
                                              alt: character[/* name */1],
                                              src: character[/* imageUrl */4]
                                            }), React.createElement("span", {
                                              className: "character-data"
                                            }, ReasonReact.element(undefined, undefined, Str.make(character[/* name */1], /* array */[])), React.createElement("span", {
                                                  className: "character-status"
                                                }, ReasonReact.element(undefined, undefined, Str.make(character[/* status */2], /* array */[]))))));
                        }), characters)));
  } else {
    return React.createElement("p", undefined, ReasonReact.element(undefined, undefined, Str.make("No characters to speak of", /* array */[])));
  }
}

function $$default(value, optional) {
  if (optional !== undefined) {
    return Js_primitive.valFromOption(optional);
  } else {
    return value;
  }
}

function exists(optional) {
  return optional !== undefined;
}

var component = ReasonReact.reducerComponent("FetchData");

function make() {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (self) {
              console.log("We are mounting!");
              fetchCharacters(/* () */0).then((function (result) {
                      if (result !== undefined) {
                        var rickAndMortyResponse = result;
                        var characters = rickAndMortyResponse[/* results */0];
                        Curry._1(self[/* send */3], /* SetCharacters */Block.__(0, [characters]));
                        return Promise.resolve(Curry._1(self[/* send */3], /* SetResponseInfo */Block.__(1, [rickAndMortyResponse[/* info */1]])));
                      } else {
                        return Promise.resolve(Curry._1(self[/* send */3], /* SetLoadingFailed */Block.__(2, ["Failed to load some characters."])));
                      }
                    }));
              return /* () */0;
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              var hasPrevious = exists(self[/* state */1][/* responseInfo */2][/* prevPageUrl */0]);
              var hasNext = exists(self[/* state */1][/* responseInfo */2][/* nextPageUrl */1]);
              var prevUrl = $$default("", self[/* state */1][/* responseInfo */2][/* prevPageUrl */0]);
              var nextUrl = $$default("", self[/* state */1][/* responseInfo */2][/* nextPageUrl */1]);
              var match = self[/* state */1][/* status */0];
              return React.createElement("div", undefined, React.createElement("span", undefined, React.createElement("button", {
                                  disabled: !hasPrevious,
                                  onClick: (function () {
                                      Curry._1(self[/* send */3], /* FetchNewPage */Block.__(3, [prevUrl]));
                                      return /* () */0;
                                    })
                                }, ReasonReact.element(undefined, undefined, Str.make("«" + " previous", /* array */[]))), ReasonReact.element(undefined, undefined, Str.make(" ... ", /* array */[])), React.createElement("button", {
                                  disabled: !hasNext,
                                  onClick: (function () {
                                      Curry._1(self[/* send */3], /* FetchNewPage */Block.__(3, [nextUrl]));
                                      return /* () */0;
                                    })
                                }, ReasonReact.element(undefined, undefined, Str.make("next " + "»", /* array */[])))), typeof match === "number" ? (
                            match !== 0 ? React.createElement("div", undefined, listCharacters(self[/* state */1][/* characters */1])) : React.createElement("p", undefined, ReasonReact.element(undefined, undefined, Str.make("We are fetching some characters...", /* array */[])))
                          ) : React.createElement("p", undefined, ReasonReact.element(undefined, undefined, Str.make(match[0], /* array */[]))));
            }),
          /* initialState */(function () {
              return /* record */[
                      /* status : Loading */0,
                      /* characters : [] */0,
                      /* responseInfo : record */[
                        /* prevPageUrl */undefined,
                        /* nextPageUrl */undefined
                      ]
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, state) {
              if (typeof action === "number") {
                return /* Update */Block.__(0, [/* record */[
                            /* status : Loading */0,
                            /* characters */state[/* characters */1],
                            /* responseInfo */state[/* responseInfo */2]
                          ]]);
              } else {
                switch (action.tag | 0) {
                  case 0 : 
                      return /* Update */Block.__(0, [/* record */[
                                  /* status : Ready */1,
                                  /* characters */action[0],
                                  /* responseInfo */state[/* responseInfo */2]
                                ]]);
                  case 1 : 
                      return /* Update */Block.__(0, [/* record */[
                                  /* status */state[/* status */0],
                                  /* characters */state[/* characters */1],
                                  /* responseInfo */action[0]
                                ]]);
                  case 2 : 
                      return /* Update */Block.__(0, [/* record */[
                                  /* status : Error */[action[0]],
                                  /* characters : [] */0,
                                  /* responseInfo */state[/* responseInfo */2]
                                ]]);
                  case 3 : 
                      var pageUrl = action[0];
                      var callback = function (param) {
                        return fetchPage(pageUrl, param);
                      };
                      return /* UpdateWithSideEffects */Block.__(2, [
                                /* record */[
                                  /* status : Loading */0,
                                  /* characters */state[/* characters */1],
                                  /* responseInfo */state[/* responseInfo */2]
                                ],
                                callback
                              ]);
                  
                }
              }
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

exports.Decode = Decode;
exports.fetchCharacters = fetchCharacters;
exports.fetchPage = fetchPage;
exports.listCharacters = listCharacters;
exports.$$default = $$default;
exports.default = $$default;
exports.__esModule = true;
exports.exists = exists;
exports.component = component;
exports.make = make;
/* component Not a pure module */
