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

      <IonSegment v-model="ordem">
        <IonSegmentButton value="desc">
          <IonLabel>Mais recentes</IonLabel>
        </IonSegmentButton>

        <IonSegmentButton value="asc">
          <IonLabel>Mais antigas</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      <IonList>
        <IonItem
          v-for="sticker in lista"
          :key="sticker.id"
        >
          <IonLabel>
            <h2>{{ sticker.nome }}</h2>
            <p>{{ sticker.selecao }} | {{ sticker.raridade }} | {{ sticker.colecao }}</p>
            <p>Coletada em {{ formatarData(sticker.data_coleta) }}</p>
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
import { ref, watch } from 'vue'
import { onIonViewWillEnter } from '@ionic/vue'

import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton
} from '@ionic/vue'

import AppHeader from '@/components/AppHeader.vue'
import { useAlbum } from '@/composables/useAlbum'

const { lista, carregarColetadas } = useAlbum()
const ordem = ref<'asc' | 'desc'>('desc')

function formatarData(data?: string) {
  if (!data) return '-'

  return new Date(data).toLocaleString('pt-BR')
}

async function carregar() {
  await carregarColetadas(ordem.value)
}

watch(ordem, carregar)
onIonViewWillEnter(carregar)
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

ion-segment {
  margin-bottom: 16px;
  background: white;
  border-radius: 8px;
  padding: 4px;
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
