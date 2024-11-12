import { defineStore } from "pinia";
import { uid, Notify } from "quasar";
import { ref, computed, reactive } from "vue";

export const useStoreEntries = defineStore("content", () => {
  // STATE
  const entries = ref([
    {
      id: uid(),
      name: "name",
      amount: 98,
      paid: false,
    },
    {
      id: uid(),
      name: "merda",
      amount: 0,
      paid: false,
    },
    {
      id: uid(),
      name: "porco dio che fastiidio",
      amount: -98,
      paid: false,
    },
    {
      id: uid(),
      name: "name",
      amount: 89546,
      paid: false,
    },
  ]);

  const options = reactive({
    sort: false,
  });

  // GETTERS
  const totalAmount = computed(() => {
    let result = 0;
    entries.value.forEach((entry) => (result += entry.amount));
    return result;
  });

  const totalAmountPaid = computed(() => {
    let result = 0;
    entries.value
      .filter((entry) => entry.paid)
      .forEach((entry) => (result += entry.amount));
    return result;
  });

  // ACTIONS
  const addEntry = (entry) => {
    const newEntry = Object.assign({}, entry, { id: uid() });
    entries.value.push(newEntry);
  };

  const deleteEntry = (id) => {
    entries.value = entries.value.filter((entry) => entry.id !== id);
    Notify.create({
      message: "Entrata eliminata",
      color: "red",
      position: "top",
    });
  };

  const reorderEntries = ({ newIndex, oldIndex }) => {
    entries.value.splice(newIndex, 0, ...entries.value.splice(oldIndex, 1));
  };

  // RETURN
  return {
    entries,
    options,
    totalAmount,
    totalAmountPaid,
    addEntry,
    deleteEntry,
    reorderEntries,
  };
});
