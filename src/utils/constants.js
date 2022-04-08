// API URI 
const API_ENDPOINT =
  "https://api.openbrewerydb.org/breweries?by_city=Milwaukee";

// Associate one color to each type of brewery
const mapColorBrewType = {
  micro: "#eed993",
  contract: "#FAE96F",
  brewpub: "#F6C101",
  planning: "#EC9D00",
  regional: "#DF8D03",
  large: "#C96E12",
};

// Brewery detail attributes to add to elements
let streetIconAttributes = {
  src: "../src/assets/pin.png",
  alt: "street",
};
let phoneIconAttributes = {
  src: "../src/assets/phone-call.png",
  alt: "phone",
};
let phoneAttributes = {};
let websiteAttributes = {
  target: "_blank",
};

export {
  mapColorBrewType,
  streetIconAttributes,
  phoneIconAttributes,
  phoneAttributes,
  websiteAttributes,
  API_ENDPOINT,
};
