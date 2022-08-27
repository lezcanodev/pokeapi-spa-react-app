
import { useState, createContext } from 'react';
import {usePokeapi} from './hooks/pokeapi';
import './App.css';

import Pokemons from './components/pokemons';
import Loading from './components/loading';
import Aside from './layouts/aside';
import Header from './layouts/header';
import Pagination from './components/pagination';

const initialPage = 0;
const pokemonsPerPage = 20;

const CapturePokemonsContext = createContext([]);

function App() {

  const [pokemons, searchParam, setSearchParams, setSearchBy] = usePokeapi(pokemonsPerPage, initialPage);
  const [capturePokemons, setCapturePokemons] = useState([]);

  if(pokemons.error) return <>Error</>;
  //if(pokemons.loading) return <Loading/>;


  return (
    <CapturePokemonsContext.Provider value={{
      'capturePokemons' : capturePokemons,
      'setCapturePokemons'  : setCapturePokemons
    }}>
    <div className="App">

      <Header />

      <Aside 
          setSearchBy = {setSearchBy}
      />

      <div className='app-content'  >
        {
          (pokemons.loading) ? <Loading/> : (
            <>
              <Pokemons
                pokemons={pokemons.data.results}
                loading = {pokemons.loading}
              />
              <Pagination
                searchParam={searchParam}
                setSearchParams={setSearchParams}
                totalPages={Math.floor(pokemons.data.count/pokemonsPerPage)}
                pokemonsPerPage={pokemonsPerPage}
              />
            </>
          )
        }

      </div>

    </div>
    </CapturePokemonsContext.Provider>
  );
}

export {CapturePokemonsContext};
export default App;
