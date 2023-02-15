import "./App.css";
import pokemon from "./pokemon.json";
import React from "react";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={onSelect}>I Choose You!</button>
    </td>
  </tr>
);

const PokemonInfo = ({ name, base: baseStats }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {Object.keys(baseStats).map((stat) => (
        <tr key={stat}>
          <td>{stat}</td>
          <td>{baseStats[stat]}</td>
        </tr>
      ))}
    </table>
  </div>
);

function App() {
  const [input, setInput] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState(null);

  const filteredPokemon = pokemon
    .filter((eachPokemon) =>
      eachPokemon.name.english.toLowerCase().includes(input.toLowerCase())
    )
    .slice(0, 20);

  console.log("Selected item", selectedItem);

  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        padding: "1rem",
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gridColumnGap: "1rem",
        }}
      >
        <div>
          <input value={input} onChange={(evt) => setInput(evt.target.value)} />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredPokemon.map((pokemon) => (
                <PokemonRow
                  pokemon={pokemon}
                  key={pokemon.id}
                  onSelect={() => setSelectedItem(pokemon)}
                />
              ))}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </div>
    </div>
  );
}

export default App;
