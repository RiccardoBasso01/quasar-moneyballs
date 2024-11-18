<script setup>
import { onMounted } from 'vue';
import { useStoreSettings } from './stores/storeSettings';
import { useStoreEntries } from './stores/storeEntries';

const storeSettings = useStoreSettings()
const storeEntries = useStoreEntries()

onMounted(() => {
  storeSettings.loadSettings()
  storeEntries.loadEntries()
})

defineOptions({
  name: 'App'
});
</script>

<template>
  <router-view />
</template>
