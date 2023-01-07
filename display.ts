export const logToDiv = (id, value) => {
  let displayDiv = document.getElementById(id);
  displayDiv.append(displayItem(value));
};

const displayItem = (value) => {
  var itemSpan = document.createElement('span');
  itemSpan.setAttribute('class', 'displayItem');
  itemSpan.textContent = value;
  return itemSpan;
};
