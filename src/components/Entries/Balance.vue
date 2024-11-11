<script setup>
import { useStoreEntries } from 'src/stores/storeEntries';
import { formatAmount, amountStatus } from 'src/js/utilities';

const storeEntries = useStoreEntries()

</script>

<template>
    <div v-if="storeEntries.totalAmountPaid" class="flex justify-between items-center q-mb-sm">
        <h6 class="q-ma-none">Pagato</h6>

        <div :class="amountStatus(storeEntries.totalAmountPaid)" class="total-amount-container q-pa-xs">
            <div class="text-h6 text-white">{{ formatAmount(storeEntries.totalAmountPaid) }}</div>
        </div>
    </div>

    <div class="flex justify-between items-center">
        <h5 class="q-ma-none">Bilancio</h5>

        <div :class="amountStatus(storeEntries.totalAmount)" class="total-amount-container q-pa-sm">
            <div class="text-h5 text-white">{{ formatAmount(storeEntries.totalAmount) }}</div>
        </div>
    </div>
</template>