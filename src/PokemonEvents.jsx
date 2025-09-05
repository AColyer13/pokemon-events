import { useState } from 'react';

function PokemonEvents() {
    const [inputValue, setInputValue] = useState('');
    const [eventStatus, setEventStatus] = useState('Pokemon Finder');
    const [pokemon, setPokemon] = useState();
    const [pokemonError, setPokemonError] = useState('');
    const [errorStatus, setErrorStatus] = useState('');
		
		 // Event handler for button click
    const handleClick = () => {
        setPokemonError(""); // reset pokemon error message before fetch
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Invalid Pokemon");
                }
                return response.json();
            })
            .then(data => setPokemon(data))
            .catch(() => setPokemonError(`${inputValue} is not a valid Pokemon`));
    };

    // Event handler for input change
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    // Event handlers for mouse events
    const handleMouseOver = () => {
        setEventStatus('Click!');
    };

    const handleMouseOut = () => {
        setEventStatus('Hit the Button!');
    };

    // Event handlers for focus events
    const handleFocus = () => {
        setEventStatus('Input field is focused, type a Pokemon name!');
    };

    const handleBlur = () => {
        setEventStatus('Input field lost focus, there will be no searching...');
    };

    // Event handlers for image load events
    const handleLoad = () => {
        setEventStatus('Image loaded successfully!');
    };

    const handleError = () => {
        setErrorStatus('Error loading image');
    };
		 
		 return (
        <div>
            <h2>Event Handling in React</h2>
            <form>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Type a Pokemon Name..."
                />
                <button
                    type="button"
                    onClick={handleClick}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    Load Pokemon
                </button>
            </form>

            {pokemon && (
                <div>
                    <p style={{ textTransform: 'capitalize' }}><b>{pokemon.name}</b></p>
                    <img src={pokemon?.sprites?.other?.home?.front_default} alt={pokemon.name} />
                    {/* Display Pokémon types */}
                    <p>
                        <b>Type{pokemon.types.length > 1 ? 's' : ''}:</b> {pokemon.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(', ')}
                    </p>
                </div>
            )}

            {pokemonError && <p style={{ color: 'red' }}>{pokemonError}</p>}

            <p>{eventStatus}</p>

            {/* Only show invalid image and error if errorStatus is set */}
            {errorStatus && (
                <>
                    <img
                        src="notValidImage.jpg"
                        alt="Not valid Image"
                        onLoad={handleLoad}
                        onError={handleError}
                    />
                    <p style={{ color: 'red' }}>{errorStatus}</p>
                </>
            )}

        </div>
    );  
}

export default PokemonEvents;