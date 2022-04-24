import { Api } from "./api.js";

/* ~~~~~~~~~~~ Model ~~~~~~~~~~~ */
export const Model = ((api) => {
  class State {
    #listOfBreweries = [];
    #listOfBreweriesType = [];

    get listOfBreweries() {
      return this.#listOfBreweries;
    }

    set listOfBreweries(newList) {
      this.#listOfBreweries = newList;
    }

    get listOfBreweriesType() {
      return this.#listOfBreweriesType;
    }

    set listOfBreweriesType(newList) {
      this.#listOfBreweriesType = newList;
    }
  }

  const getBreweries = api.getBreweries;

  return {
    getBreweries,
    State,
  };
})(Api);
