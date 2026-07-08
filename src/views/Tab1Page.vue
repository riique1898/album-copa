<template>
  <IonPage>
    <AppHeader
      titulo="Album da Copa do Mundo"
      cor="success"
    />

    <IonContent class="ion-padding">
      <IonCard class="stats-card">
        <IonCardContent>
          <h2>Meu Album</h2>

          <p>Total: {{ estatisticas.total }}</p>
          <p>Coletadas: {{ estatisticas.coletadas }}</p>
          <p>Pendentes: {{ estatisticas.pendentes }}</p>

          <hr />

          <p>Raras coletadas: {{ estatisticas.raras }}</p>
          <p>Brilhantes coletadas: {{ estatisticas.brilhantes }}</p>
          <p>Conclusao: {{ estatisticas.percentual }}%</p>
        </IonCardContent>
      </IonCard>

      <IonSearchbar
        v-model="pesquisa"
        placeholder="Pesquisar jogador, selecao ou colecao"
      />

      <IonSegment v-model="filtro">
        <IonSegmentButton value="todas">
          <IonLabel>Todas</IonLabel>
        </IonSegmentButton>

        <IonSegmentButton value="coletadas">
          <IonLabel>Coletadas</IonLabel>
        </IonSegmentButton>

        <IonSegmentButton value="pendentes">
          <IonLabel>Pendentes</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      <StickerList
        :stickers="lista"
        @toggle="alterarStatus"
      />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from '@ionic/vue'

import AppHeader from '@/components/AppHeader.vue'
import StickerList from '@/components/StickerList.vue'
import { useAlbum } from '@/composables/useAlbum'

const {
  lista,
  estatisticas,
  toggleColetada,
  carregarFigurinhas,
  carregarColetadas,
  carregarPendentes,
  buscar
} = useAlbum()

const pesquisa = ref('')
const filtro = ref('todas')

async function atualizarLista() {
  if (pesquisa.value.trim()) {
    await buscar(pesquisa.value)
    return
  }

  if (filtro.value === 'coletadas') {
    await carregarColetadas()
    return
  }

  if (filtro.value === 'pendentes') {
    await carregarPendentes()
    return
  }

  await carregarFigurinhas()
}

async function alterarStatus(id: number) {
  await toggleColetada(id)
  await atualizarLista()
}

watch([filtro, pesquisa], atualizarLista)
onMounted(atualizarLista)
</script>

<style scoped>
ion-content {
  --background: #f2f5f2;
}

.stats-card {
  background: linear-gradient(135deg, #006847, #009c5b);
  color: white;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.stats-card h2 {
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.stats-card p {
  font-size: 1rem;
  margin: 8px 0;
}

.stats-card hr {
  margin: 15px 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

ion-searchbar {
  margin-bottom: 16px;
  --border-radius: 8px;
}

ion-segment {
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
  padding: 4px;
}

ion-segment-button {
  font-weight: 600;
}
</style>
