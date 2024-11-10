<script setup>
import { useStoreEntries } from 'src/stores/storeEntries';
import { formatAmount, amountStatus } from 'src/js/utilities';

const storeEntries = useStoreEntries()

</script>

<template>
    <h5 class="q-ma-none">Bilancio</h5>

    <div :class="amountStatus(storeEntries.totalAmount)" class="total-amount-container q-pa-sm">
        <div class="text-h5 text-white">{{ formatAmount(storeEntries.totalAmount) }}</div>
    </div>
</template>