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

                <q-separator class="q-my-md" />

                <q-item-label header>Temi</q-item-label>

                <q-item>
                    <q-item-section avatar>
                        <q-radio v-model="storeSettings.settings.darkMode" checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye" :val="false" />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>Tema chiaro</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item>
                    <q-item-section avatar>
                        <q-radio v-model="storeSettings.settings.darkMode" checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye" :val="true" />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>Tema scuro</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                    <q-item-section avatar>
                        <q-radio v-model="storeSettings.settings.darkMode" checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye" val="auto" />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>Auto</q-item-label>
                        <q-item-label caption>Segue le impostazioni del dispositivo</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </q-page>
</template>
