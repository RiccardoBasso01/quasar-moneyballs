<script setup>
import { ref, reactive } from 'vue';
import { useStoreEntries } from 'src/stores/storeEntries';

const storeEntries = useStoreEntries()

// Toggle form
const addBannerVisible = ref(false)
const addItem = () => addBannerVisible.value = !addBannerVisible.value

// Set Form values
const addEntryFormDefault = {
    name: '',
    amount: null,
    paid: false,
}

// Add Entry
const nameRef = ref(null)

const addEntryForm = reactive({ ...addEntryFormDefault })

const resetEntryForm = () => Object.assign(addEntryForm, addEntryFormDefault)

const addEntry = () => {
    storeEntries.addEntry(addEntryForm)
    resetEntryForm()
    nameRef.value.focus()
}
</script>

<template>
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
</template>