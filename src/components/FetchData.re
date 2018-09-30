/* {
     "info": {
       "count": 394,
       "pages": 20,
       "next": "https://rickandmortyapi.com/api/character/?page=2",
       "prev": ""
     },
     "results": [
       {
         "id": 1,
         "name": "Rick Sanchez",
         "status": "Alive",
         "species": "Human",
         "type": "",
         "gender": "Male",
         "origin": {
           "name": "Earth",
           "url": "https://rickandmortyapi.com/api/location/1"
         },
         "location": {
           "name": "Earth",
           "url": "https://rickandmortyapi.com/api/location/20"
         },
         "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
         "episode": [
           "https://rickandmortyapi.com/api/episode/1",
           "https://rickandmortyapi.com/api/episode/2",
           // ...
         ],
         "url": "https://rickandmortyapi.com/api/character/1",
         "created": "2017-11-04T18:48:46.250Z"
       },
       // ...
     ]
   } */

type character = {
  id: int,
  name: string,
  status: string,
  species: string,
};

type rickAndMortyResponse = {results: list(character)};

module Decode = {
  let character = json: character =>
    Json.Decode.{
      id: field("id", int, json),
      name: field("name", string, json),
      status: field("status", string, json),
      species: field("species", string, json),
    };
  let characters = json: list(character) =>
    Json.Decode.list(character, json);
  let results = json: rickAndMortyResponse =>
    Json.Decode.{results: field("results", characters, json)};
};

/* State declaration */
type state = {characters: list(character)};

/* Action declaration */
type action =
  | SetCharacters(list(character));

/* Component template declaration.
   Needs to be **after** state and action declarations! */
let component = ReasonReact.reducerComponent("FetchData");

/* greeting and children are props. `children` isn't used, therefore ignored.
   We ignore it by prepending it with an underscore */
let make = _children => {
  /* spread the other default fields of component here and override a few */
  ...component,
  initialState: () => {characters: []},
  didMount: _self => {
    Js.log("We are mounting!");
    let _ =
      Js.Promise.(
        Fetch.fetch("/api/character/")
        |> then_(Fetch.Response.json)
        |> then_(json => json |> Decode.results |> resolve)
        |> then_(results => results.results |> Js.log |> resolve)
      );
    ();
  },
  /* State transitions */
  reducer: (action, state) =>
    switch (action) {
    | SetCharacters(characters) => ReasonReact.Update({...state, characters})
    },
  render: self =>
    <div>
      <p> {ReasonReact.string("We are fetching some characters!")} </p>
    </div>,
};