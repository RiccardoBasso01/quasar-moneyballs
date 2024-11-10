<script setup>
import { useStoreEntries } from 'src/stores/storeEntries';

// Components
import Balance from 'src/components/Entries/Balance.vue';
import AddEntries from 'src/components/Entries/AddEntries.vue';
import Entry from 'src/components/Entries/Entry.vue';

const storeEntries = useStoreEntries()
</script>

<template>
  <!-- List -->
  <q-list class="q-ma-lg">
    <AddEntries />

    <!-- Other items -->
    <Entry v-for="entry in storeEntries.entries" :key="entry.id" :entry="entry" />
  </q-list>

  <!-- Footer -->
  <q-footer class="bg-primary text-white q-pa-sm flex justify-between items-center">
    <Balance />
  </q-footer>
</template>