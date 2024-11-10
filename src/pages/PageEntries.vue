<script setup>
import { ref, computed, reactive } from 'vue';
import { uid, useQuasar } from 'quasar'
import { formatAmount, amountStatus } from 'src/js/utilities';

const entries = ref([
  {
    id: uid(),
    name: 'name',
    amount: 98
  },
  {
    id: uid(),
    name: 'name',
    amount: 0
  },
  {
    id: uid(),
    name: 'name',
    amount: -98
  },
  {
    id: uid(),
    name: 'name',
    amount: 89546
  },
])

// Calculate the total amount
const totalAmount = computed(() => {
  let result = 0
  entries.value.forEach(entry => result += entry.amount)
  return result
})

// Toggle form
const addBannerVisible = ref(false)
const addItem = () => addBannerVisible.value = !addBannerVisible.value

// Set Form values
const addEntryFormDefault = {
  name: '',
  amount: null
}

const nameRef = ref(null)

const addEntryForm = reactive({ ...addEntryFormDefault })

const resetEntryForm = () => Object.assign(addEntryForm, addEntryFormDefault)

// Add Entry
const addEntry = () => {
  const newEntry = Object.assign({}, addEntryForm, { id: uid() })
  entries.value.push(newEntry)
  resetEntryForm()
  nameRef.value.focus()
}

// Dialog
const $q = useQuasar()
function deleteModal({ reset }, entry) {
  $q.dialog({
    title: 'Cancella',
    message: `Sicuro di voler eliminare questa entrata?
    <div>
      ${entry.name} : ${formatAmount(entry.amount)}
    </div>
    `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: 'Conferma',
    },
    cancel: {
      label: 'Annulla'
    }
  }).onOk(() => {
    deleteEntry(entry.id)
    showNotif()
  })
    .onCancel(() => reset())
}

const deleteEntry = (id) => {
  entries.value = entries.value.filter(entry => entry.id !== id)
}

const showNotif = () => {
  $q.notify({
    message: 'Entrata eliminata',
    color: 'red',
    position: "top"
  })
}
</script>

<template>
  <!-- List -->
  <q-list class="q-ma-lg">
    <!-- Toggle form -->
    <q-item class="money-add-item q-mb-lg">
      <div class="text-h5 q-ma-0">Aggiungi</div>

      <q-icon name="add" size="xl" />
      <button @click="addItem()" class="money-add-button"></button>
    </q-item>

    <!-- Form -->
    <q-item v-if="addBannerVisible" class="money-list-item block q-mb-sm">
      <q-form class="row q-col-gutter-lg" @submit="addEntry">
        <q-input class="col-5" type="text" outlined v-model="addEntryForm.name" label="Nome" ref="nameRef" />
        <q-input class="col-5" type="number" outlined v-model.number="addEntryForm.amount" label="Quantità" />
        <div class="col-2 flex items-center ">
          <q-btn class="full-width" label="Submit" type="Inserisci" color="primary" />
        </div>
      </q-form>
    </q-item>

    <!-- Other items -->
    <q-slide-item class="money-list-item q-mb-sm" :class="amountStatus(entry.amount)"
      @right="deleteModal($event, entry)" v-for="entry in entries" :key="entry.id" left-color="green" right-color="red">
      <!-- <template v-slot:left>
        <q-icon name="done" />
      </template> -->
      <template v-slot:right>
        <q-icon name="delete" />
      </template>

      <q-item>
        <q-item-section class="text-bold">
          {{ entry.name }}
        </q-item-section>

        <q-item-section side>
          {{ formatAmount(entry.amount) }}
        </q-item-section>
      </q-item>
    </q-slide-item>
  </q-list>

  <!-- Footer -->
  <q-footer class="bg-primary text-white q-pa-sm flex justify-between items-center">
    <h5 class="q-ma-none">Bilancio</h5>

    <div :class="amountStatus(totalAmount)" class="total-amount-container q-pa-sm">
      <div class="text-h5 text-white">{{ formatAmount(totalAmount) }}</div>
    </div>
  </q-footer>
</template>