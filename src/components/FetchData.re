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

type status =
  | Loading
  | Error(string)
  | Ready;

type character = {
  id: int,
  name: string,
  status: string,
  species: string,
  imageUrl: string,
};

type rickAndMortyResponse = {results: list(character)};

module Decode = {
  open Json.Decode;
  let character = json: character => {
    id: field("id", int, json),
    name: field("name", string, json),
    status: field("status", string, json),
    species: field("species", string, json),
    imageUrl: field("image", string, json),
  };
  let characters = json: list(character) => list(character, json);
  let results = json: rickAndMortyResponse => {
    results: field("results", characters, json),
  };
};

/* State declaration */
type state = {
  status,
  characters: list(character),
};

/* Action declaration */
type action =
  | SetCharacters(list(character))
  | SetLoadingFailed(string);

let fetchCharacters = () =>
  Js.Promise.(
    Fetch.fetch("/api/character/")
    |> then_(Fetch.Response.json)
    |> then_(json =>
         json
         |> Decode.results
         |> (results => Some(results.results))
         |> resolve
       )
    |> catch(_err => None |> resolve)
  );

let listCharacters = (characters: list(character)) =>
  switch (characters) {
  | [] => <p> <Str s="No characters to speak of" /> </p>
  | characters =>
    <ul className="character-list">
      {
        characters
        |> List.map(character =>
             <li key={string_of_int(character.id)}>
               <div className="character-card">
                 <img
                   className="character-img"
                   src={character.imageUrl}
                   alt={character.name}
                 />
                 <span className="character-data">
                   <Str s={character.name} />
                   <span className="character-status">
                     <Str s={character.status} />
                   </span>
                 </span>
               </div>
             </li>
           )
        |> Array.of_list
        |> ReasonReact.array
      }
    </ul>
  };

/* Component template declaration.
   Needs to be **after** state and action declarations! */
let component = ReasonReact.reducerComponent("FetchData");

/* greeting and children are props. `children` isn't used, therefore ignored.
   We ignore it by prepending it with an underscore */
let make = _children => {
  /* spread the other default fields of component here and override a few */
  ...component,
  initialState: () => {status: Loading, characters: []},
  didMount: self => {
    Js.log("We are mounting!");
    Js.Promise.(
      fetchCharacters()
      |> then_(result =>
           switch (result) {
           | Some(characters) =>
             self.send(SetCharacters(characters)) |> resolve
           | None =>
             self.send(SetLoadingFailed("Failed to load some characters."))
             |> resolve
           }
         )
    )
    |> ignore;
  },
  /* State transitions */
  reducer: (action, state) =>
    switch (action) {
    | SetCharacters(characters) =>
      ReasonReact.Update({...state, characters, status: Ready})
    | SetLoadingFailed(msg) =>
      ReasonReact.Update({...state, characters: [], status: Error(msg)})
    },
  render: self =>
    switch (self.state.status) {
    | Loading => <p> <Str s="We are fetching some characters..." /> </p>
    | Error(msg) => <p> <Str s=msg /> </p>
    | Ready => <div> {listCharacters(self.state.characters)} </div>
    },
};