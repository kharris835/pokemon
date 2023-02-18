import "./App.css";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button variant="contained" color="secondary" onClick={onSelect}>
        I Choose You!
      </Button>
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

const Title = styled.h1`
  text-align: center;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: 1rem;
`;
const Container = styled.div`
  margin: auto;
  width: 800px;
  padding: 1rem;
`;
const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

function App() {
  const [input, setInput] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [pokemon, setPokemon] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/pokemon.json")
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, []);

  const filteredPokemon = pokemon
    .filter((eachPokemon) =>
      eachPokemon.name.english.toLowerCase().includes(input.toLowerCase())
    )
    .slice(0, 20);

  console.log("Selected item", selectedItem);

  return (
    <Container>
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <Input value={input} onChange={(evt) => setInput(evt.target.value)} />
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
      </TwoColumnLayout>
    </Container>
  );
}

export default App;
