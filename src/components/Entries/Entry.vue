<script setup>
import { useQuasar } from 'quasar'
import { useStoreEntries } from 'src/stores/storeEntries';
import { useStoreSettings } from 'src/stores/storeSettings';
import { formatAmount, amountStatus } from 'src/js/utilities';
import vSelectAll from 'src/directives/directiveSelectAll';

const storeEntries = useStoreEntries(), storeSettings = useStoreSettings()

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
    if (storeSettings.settings.promptToDelete) promptToDelete(reset)
    else storeEntries.deleteEntry(props.entry.id)
}

const promptToDelete = (reset) => {
    $q.dialog({
        title: 'Cancella',
        message: `Sicuro di voler eliminare questa entrata?
    <div>
      ${props.entry.name} : ${storeSettings.formatAmount(props.entry.amount)}
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

function paidEntry({ reset }) {
    props.entry.paid = !props.entry.paid
    reset()
}
</script>

<template>
    <q-slide-item class="money-list-item q-mb-sm"
        :class="[amountStatus(props.entry.amount), { 'text-strike paid': props.entry.paid }]" @right="deleteModal"
        @left="paidEntry" left-color="green" right-color="red">
        <template v-slot:left>
            <q-icon name="done" />
        </template>
        <template v-slot:right>
            <q-icon name="delete" />
        </template>

        <q-item>
            <q-item-section class="text-bold">
                {{ props.entry.name }}

                <q-popup-edit v-model="props.entry.name" auto-save v-slot="scope">
                    <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" v-select-all />
                </q-popup-edit>
            </q-item-section>

            <q-item-section side>
                {{ storeSettings.formatAmount(props.entry.amount) }}

                <q-popup-edit v-model.number="props.entry.amount" auto-save v-slot="scope">
                    <q-input v-model="scope.value" dense autofocus counter type="number" @keyup.enter="scope.set"
                        v-select-all />
                </q-popup-edit>
            </q-item-section>

            <q-item-section v-if="storeEntries.options.sort" side class="handle-sort">
                <q-icon name="toc"></q-icon>
            </q-item-section>
        </q-item>
    </q-slide-item>
</template>