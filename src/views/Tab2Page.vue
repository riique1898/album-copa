<template>
  <IonPage>
    <AppHeader
      titulo="Figurinhas Coletadas"
      cor="warning"
    />

    <IonContent class="ion-padding">
      <IonCard>
        <IonCardContent>
          Voce possui
          <strong>{{ lista.length }}</strong>
          figurinhas coletadas.
        </IonCardContent>
      </IonCard>

      <IonList>
        <IonItem
          v-for="sticker in lista"
          :key="sticker.id"
        >
          <IonLabel>
            <h2>{{ sticker.nome }}</h2>
            <p>{{ sticker.selecao }} | {{ sticker.raridade }} | {{ sticker.colecao }}</p>
          </IonLabel>
        </IonItem>
      </IonList>

      <p
        v-if="lista.length === 0"
        class="vazio"
      >
        Nenhuma figurinha coletada.
      </p>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { onIonViewWillEnter } from '@ionic/vue'

import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue'

import AppHeader from '@/components/AppHeader.vue'
import { useAlbum } from '@/composables/useAlbum'

const { lista, carregarColetadas } = useAlbum()

onIonViewWillEnter(carregarColetadas)
</script>

<style scoped>
ion-content {
  --background: #f4f7f5;
}

ion-card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}

ion-item {
  margin-bottom: 10px;
  border-radius: 8px;
  --background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

ion-item h2 {
  font-weight: 700;
  color: #f57c00;
}

ion-item p {
  color: #666;
}

.vazio {
  text-align: center;
  margin-top: 30px;
  color: gray;
}
</style>
