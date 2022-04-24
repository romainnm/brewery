import { Model } from "./model.js";
import { View } from "./view.js";

/* ~~~~~~~~~~~ Controller ~~~~~~~~~~~ */
export const Controller = ((model, view) => {
  const state = new model.State();

  const init = () => {
    model.getBreweries().then((data) => {
      state.listOfBreweries = data;
      state.listOfBreweriesType = [
        ...new Set(["all", ...data.map((brewery) => brewery.brewery_type)]),
      ];
      view.renderBreweries(state.listOfBreweries);
      view.renderSorting(state.listOfBreweriesType);
    });
  };

  const sortBreweriesDropdown = () => {
    const breweryDropdownForm = document.getElementById(
      view.domstr.breweryDropdownForm
    );

    breweryDropdownForm.addEventListener("change", (e) => {
      e.preventDefault();
      const typeSelected = e.target.value;
      if (typeSelected === "all") {
        view.renderBreweries(state.listOfBreweries);
      } else {
        let listOfBreweries_filtered = [...state.listOfBreweries];
        const newList = listOfBreweries_filtered.filter(
          (item) => item.brewery_type === typeSelected
        );
        view.renderBreweries(newList);
      }
    });
  };

  const bundle = () => {
    init();
    sortBreweriesDropdown();
  };

  return { bundle };
})(Model, View);
