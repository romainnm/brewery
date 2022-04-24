/* Utils */
import {
  formatPhoneNumber,
  formatURL,
  setAttributes,
} from "../utils/helpers.js";
import {
  mapColorBrewType,
  streetIconAttributes,
  phoneIconAttributes,
  phoneAttributes,
  websiteAttributes,
} from "../utils/constants.js";

/* ~~~~~~~~~~~ View ~~~~~~~~~~~ */
export const View = (() => {
  const domstr = {
    breweryList: ".brewery-list",
    breweryTemplate: "brewery-template",
    breweryDropdown: "brewery-dropdown",
    breweryDropdownForm: "brewery-dropdown-form",
  };

  const fillBreweryInfoContent = (
    element,
    selectClass,
    detail,
    type,
    attributeList
  ) => {
    const el = element.querySelector(selectClass);
    if (type === "content") {
      el.textContent = detail;
    }
    if (type === "phone") {
      el.textContent = formatPhoneNumber(detail);
      attributeList.href = `tel:${detail}`;
      setAttributes(el, attributeList);
    }
    if (type === "website") {
      el.textContent = formatURL(detail);
      attributeList.href = detail;
      setAttributes(el, attributeList);
    }
    if (type === "icon" && detail) {
      setAttributes(el, attributeList);
    }
  };

  const addColorTagToBrewery = (type, element) => {
    for (const typeColor in mapColorBrewType) {
      if (type === typeColor) {
        const breweryType = element.querySelector(".brewery-type");
        breweryType.style.backgroundColor = mapColorBrewType[typeColor];
        breweryType.parentElement.parentElement.style.borderTop = `4px solid ${mapColorBrewType[typeColor]}`;
      }
    }
  };

  const createTemplate = () => {
    return document.querySelector(domstr.breweryList);
  };

  const renderSorting = (breweriesType) => {
    const breweryDropdown = document.getElementById(domstr.breweryDropdown);
    for (const type of breweriesType) {
      const breweryDropEl = document.createElement("option");
      breweryDropEl.value = type;
      breweryDropEl.textContent = type;
      breweryDropdown.append(breweryDropEl);
    }
  };

  const renderBreweries = (breweries) => {
    const breweryList = createTemplate();
    const breweryTemplate = document.getElementById(domstr.breweryTemplate);
    // Reset the render
    breweryList.innerHTML = "";
    // Construct the render using brewery-template
    for (const brewery of breweries) {
      const {
        name,
        brewery_type: type,
        street,
        phone,
        website_url: website,
      } = brewery;

      const breweryEl = document.importNode(breweryTemplate.content, true);

      fillBreweryInfoContent(breweryEl, ".brewery-name", name, "content");
      fillBreweryInfoContent(breweryEl, ".brewery-type", type, "content");
      fillBreweryInfoContent(breweryEl, ".brewery-street", street, "content");
      fillBreweryInfoContent(
        breweryEl,
        ".brewery-phone",
        phone,
        "phone",
        phoneAttributes
      );
      fillBreweryInfoContent(
        breweryEl,
        ".brewery-website",
        website,
        "website",
        websiteAttributes
      );
      fillBreweryInfoContent(
        breweryEl,
        ".brewery-street-icon",
        street,
        "icon",
        streetIconAttributes
      );
      fillBreweryInfoContent(
        breweryEl,
        ".brewery-phone-icon",
        phone,
        "icon",
        phoneIconAttributes
      );

      addColorTagToBrewery(type, breweryEl);
      breweryList.append(breweryEl);
    }
  };

  return {
    domstr,
    renderBreweries,
    renderSorting,
  };
})();
