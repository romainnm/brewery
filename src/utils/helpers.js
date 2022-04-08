function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
}

function formatURL(url) {
  if (url) {
    let shortURL = url.replace(/^https?:\/\//, "");
    shortURL = shortURL.replace(/^www./, "");
    return shortURL;
  }
}

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
}

export { formatPhoneNumber, formatURL, setAttributes };
