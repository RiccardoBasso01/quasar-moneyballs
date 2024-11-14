<script setup>
import { useStoreSettings } from 'src/stores/storeSettings';

const storeSettings = useStoreSettings()

const setCurrency = (currency) => storeSettings.settings.currentCurrency = currency
</script>

<template>
    <q-page>
        <div class="q-pa-md">
            <q-list bordered padding>
                <q-item-label header>Impostazioni</q-item-label>

                <q-item tag="label" v-ripple>
                    <q-item-section>
                        <q-item-label>Conferma per eliminare</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-toggle color="blue" v-model="storeSettings.settings.promptToDelete" val="battery" />
                    </q-item-section>
                </q-item>

                <q-item>
                    <q-item-section>
                        <q-item-label>Moneta</q-item-label>
                    </q-item-section>
                    <q-btn-dropdown color="primary" label="Seleziona una valuta">
                        <q-list>
                            <q-item clickable v-close-popup @click="setCurrency('€')">
                                <q-item-section>
                                    <q-item-label>€</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup @click="setCurrency('£')">
                                <q-item-section>
                                    <q-item-label>£</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup @click="setCurrency('$')">
                                <q-item-section>
                                    <q-item-label>$</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </q-item>
            </q-list>
        </div>
    </q-page>
</template>
