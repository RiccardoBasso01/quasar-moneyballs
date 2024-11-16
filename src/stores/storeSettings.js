import { defineStore } from "pinia";
import { computed, reactive, watch } from "vue";
import { Dark } from "quasar";

export const useStoreSettings = defineStore("settings", () => {
  // STATE
  const settings = reactive({
    promptToDelete: true,
    currentCurrency: "€",
    darkMode: false,
  });

  // WATCHERS
  watch(settings, (newSettings) => {
    // On theme changes
    Dark.set(newSettings.darkMode);
  });

  // GETTERS
  const formatAmount = (number) => {
    console.log(number);
    let currency;
    let country;
    if (settings.currentCurrency === "€") {
      currency = "EUR";
      country = "it-IT";
    } else if (settings.currentCurrency === "£") {
      currency = "GBP";
      country = "en-GB";
    } else if (settings.currentCurrency === "$") {
      currency = "USD";
      country = "en-US";
    }

    const direction = number >= 0 ? (number === 0 ? "" : "+") : "-";
    if (number < 0) number *= -1;

    number = new Intl.NumberFormat(country, {
      style: "currency",
      currency,
    }).format(number);

    return `${direction} ${number}`;
  };

  // RETURN
  return { settings, formatAmount };
});
