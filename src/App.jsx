import { useState, useEffect } from "react";
import MemoryCard from "./MemoryCard";
import "./styles.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedPokemons, setClickedPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => response.json())
      .then((data) => {
        const shuffled = [...data.results].sort(() => Math.random() - 0.5);
        setPokemonList(shuffled);
      });
  }, []);

  function handleCardClick(pokemonName) {
    if (clickedPokemons.includes(pokemonName)) {
      setScore(0);
      setClickedPokemons([]);
      setBestScore((prevBest) => Math.max(prevBest, score));
    } else {
      setScore((prevScore) => prevScore + 1);
      setClickedPokemons((prevClicked) => [...prevClicked, pokemonName]);
    }
    setPokemonList((prevList) => {
      const newList = [...prevList].sort(() => Math.random() - 0.5);
      return newList;
    });
  }

  return (
    <main>
      <div className="score-container">
        <h1>Memory Card Game</h1>
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
        <p>Get points by clicking on an image but don't click on any more than once!
        </p>
      </div>
      <div className="card-container">
        {pokemonList.map((pokemon) => (
          <MemoryCard
            key={pokemon.name}
            onClick={() => handleCardClick(pokemon.name)}
            detailUrl={pokemon.url}
            name={pokemon.name}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
