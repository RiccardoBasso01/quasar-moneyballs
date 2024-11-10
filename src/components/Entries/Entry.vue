<script setup>
import { useQuasar } from 'quasar'
import { useStoreEntries } from 'src/stores/storeEntries';
import { formatAmount, amountStatus } from 'src/js/utilities';

const storeEntries = useStoreEntries()

// Props
const props = defineProps({
    entry: {
        type: Object,
        required: true
    }
})

// Dialog
const $q = useQuasar()
function deleteModal({ reset }) {
    $q.dialog({
        title: 'Cancella',
        message: `Sicuro di voler eliminare questa entrata?
    <div>
      ${props.entry.name} : ${formatAmount(props.entry.amount)}
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
    }).onOk(() => storeEntries.deleteEntry(props.entry.id))
        .onCancel(() => reset())
}
</script>

<template>
    <q-slide-item class="money-list-item q-mb-sm" :class="amountStatus(props.entry.amount)" @right="deleteModal($event)"
        left-color="green" right-color="red">
        <!-- <template v-slot:left>
        <q-icon name="done" />
      </template> -->
        <template v-slot:right>
            <q-icon name="delete" />
        </template>

        <q-item>
            <q-item-section class="text-bold">
                {{ props.entry.name }}
            </q-item-section>

            <q-item-section side>
                {{ formatAmount(props.entry.amount) }}
            </q-item-section>
        </q-item>
    </q-slide-item>
</template>