import "./App.css";
import pokemon from "./pokemon.json";
import React from "react";

const PokemonRow = ({ pokemon }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
  </tr>
);

function App() {
  const [filter, setFilter] = React.useState("");

  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        padding: "1rem",
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <input value={filter} onChange={(evt) => setFilter(evt.target.value)} />
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {pokemon
            .filter((pokemon) =>
              pokemon.name.english.toLowerCase().includes(filter.toLowerCase())
            )
            .slice(0, 20)
            .map((pokemon) => (
              <PokemonRow pokemon={pokemon} key={pokemon.id} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
