/* Utils */
import {
  formatPhoneNumber,
  formatURL,
  setAttributes,
} from "./utils/helpers.js";
import {
  mapColorBrewType,
  streetIconAttributes,
  phoneIconAttributes,
  phoneAttributes,
  websiteAttributes,
  API_ENDPOINT,
} from "./utils/constants.js";

/* DOM elements */
const breweryList = document.querySelector(".brewery-list");
const breweryTemplate = document.getElementById("brewery-template");
const breweryDropdown = document.getElementById("brewery-dropdown");
const breweryDropdownForm = document.getElementById("brewery-dropdown-form");

/* Brewery Data */
let listOfBreweries_data = [];
let listOfBreweries_filtered = [...listOfBreweries_data];

/* Functions -> Fetch data / Render / Sort Type */
async function fetchBreweries() {
  const response = await fetch(API_ENDPOINT);
  const listOfBreweries = await response.json();
  // Get unique value of brewery type
  const breweryTypes = [
    ...new Set([
      "all",
      ...listOfBreweries.map((brewery) => brewery.brewery_type),
    ]),
  ];
  // Render brewery types in dropdown
  for (const type of breweryTypes) {
    const breweryDropEl = document.createElement("option");
    breweryDropEl.value = type;
    breweryDropEl.textContent = type;
    breweryDropdown.append(breweryDropEl);
  }
  // Get list of breweries
  for (const brewery of listOfBreweries) {
    listOfBreweries_data.push(brewery);
    render(listOfBreweries);
  }
}

function render(brewList) {
  // Reset the render
  breweryList.innerHTML = "";
  // Construct the render using brewery-template
  for (const brewery of brewList) {
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
}

function fillBreweryInfoContent(
  element,
  selectClass,
  detail,
  type,
  attributeList
) {
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
}

function addColorTagToBrewery(type, element) {
  for (const typeColor in mapColorBrewType) {
    if (type === typeColor) {
      const breweryType = element.querySelector(".brewery-type");
      breweryType.style.backgroundColor = mapColorBrewType[typeColor];
      breweryType.parentElement.parentElement.style.borderTop = `4px solid ${mapColorBrewType[typeColor]}`;
    }
  }
}

function sortByType(type, list) {
  if (type === "all") {
    render(listOfBreweries_data);
  } else {
    list = list.filter((item) => item.brewery_type === type);
    render(list);
  }
}

/* Dropdown Logic */
breweryDropdownForm.addEventListener("change", (e) => {
  e.preventDefault();
  // Copy of original data for filtering
  listOfBreweries_filtered = [...listOfBreweries_data];
  const typeSelected = e.target.value;
  sortByType(typeSelected, listOfBreweries_filtered);
});

fetchBreweries();
