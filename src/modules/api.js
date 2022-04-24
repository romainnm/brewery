import { API_ENDPOINT } from "../utils/constants.js";
/* ~~~~~~~~~~~ Api ~~~~~~~~~~~ */
export const Api = (() => {
  const getBreweries = async () => {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return data;
  };

  return {
    getBreweries,
  };
})();
