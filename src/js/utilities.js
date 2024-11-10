export function formatAmount(number) {
  const direction = number >= 0 ? (number === 0 ? "" : "+") : "-";
  if (number < 0) number *= -1;

  number = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(number);

  return `${direction} ${number}`;
}

export function amountStatus(number) {
  if (number === 0) return "";
  else return number > 0 ? "amount-positive" : "amount-negative";
}
