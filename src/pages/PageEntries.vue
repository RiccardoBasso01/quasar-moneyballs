<script setup>
import { ref, computed } from 'vue';
import { formatAmount, amountStatus } from 'src/js/utilities';

const entries = ref([
  {
    id: 'id',
    name: 'name',
    amount: 98
  },
  {
    id: 'id',
    name: 'name',
    amount: 0
  },
  {
    id: 'id',
    name: 'name',
    amount: -98
  },
  {
    id: 'id',
    name: 'name',
    amount: 89546
  },
])

const text = ref(null)
const quantity = ref(null)

const totalAmount = computed(() => {
  let result = 0
  entries.value.forEach(entry => result += entry.amount)
  return result
})

const addBannerVisible = ref(false)
const addItem = () => addBannerVisible.value = !addBannerVisible.value
</script>

<template>
  <q-list class="q-ma-lg">
    <q-item class="money-add-item q-mb-lg">
      <div class="text-h5 q-ma-0">Aggiungi</div>

      <q-icon name="add" size="xl" />
      <button @click="addItem()" class="money-add-button"></button>
    </q-item>


    <q-item v-if="addBannerVisible" class="money-list-item block q-mb-sm">
      <q-form class="row q-col-gutter-lg">
        <q-input class="col-5" type="text" outlined v-model="text" label="Nome" />
        <q-input class="col-5" type="text" outlined v-model="quantity" label="Quantità" />
        <div class="col-2 flex items-center ">
          <q-btn class="full-width" label="Submit" type="Inserisci" color="primary" />
        </div>
      </q-form>
    </q-item>

    <q-item v-for="entry, i in entries" :key="entry.id + i" class="money-list-item q-mb-sm"
      :class="amountStatus(entry.amount)">
      <q-item-section class="text-bold">
        {{ entry.name + i }}
      </q-item-section>

      <q-item-section side>
        {{ formatAmount(entry.amount) }}
      </q-item-section>

      <q-footer class="bg-primary text-white q-pa-sm flex justify-between items-center">
        <h5 class="q-ma-none">Bilancio</h5>

        <div :class="amountStatus(entry.amount)" class="total-amount-container q-pa-sm">
          <div class="text-h5 text-white">{{ formatAmount(totalAmount) }}</div>
        </div>
      </q-footer>
    </q-item>
  </q-list>
</template>