

const pokemonSpecie = async (id) => {
    const uri = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    return fetch(uri).then(res => res.json());
}

const pokemonLocationArea = (id) => {
    const uri = `https://pokeapi.co/api/v2/pokemon/${id}/encounters`;
    return fetch(uri).then(res => res.json());
}

function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
      (r) => {
        status = "success";
        result = r;
      },
      (e) => {
        status = "error";
        result = e;
      }
    );
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      }
    };
}


export {pokemonSpecie, pokemonLocationArea, wrapPromise};