<template>
  <IonPage>

    <AppHeader
      titulo="🏆 Álbum da Copa do Mundo"
      cor="success"
    />

    <IonContent class="ion-padding">

      <IonCard class="stats-card">
        <IonCardContent>

          <h2>🏆 Meu Álbum</h2>

          <p>📚 Total: {{ total }}</p>

          <p>✅ Coletadas: {{ coletadas }}</p>

          <p>❌ Pendentes: {{ pendentes }}</p>

        </IonCardContent>
      </IonCard>

      <IonSearchbar
        v-model="pesquisa"
        placeholder="Pesquisar jogador ou seleção"
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
        :stickers="figurinhasFiltradas"
        @toggle="toggleColetada"
      />

    </IonContent>

  </IonPage>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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

const { lista, toggleColetada } = useAlbum()

const pesquisa = ref('')
const filtro = ref('todas')

const total = computed(() => {
  return lista.value.length
})

const coletadas = computed(() => {
  return lista.value.filter(
    sticker => sticker.coletada
  ).length
})

const pendentes = computed(() => {
  return total.value - coletadas.value
})

const figurinhasFiltradas = computed(() => {

  let resultado = lista.value

  if (filtro.value === 'coletadas') {
    resultado = resultado.filter(
      sticker => sticker.coletada
    )
  }

  if (filtro.value === 'pendentes') {
    resultado = resultado.filter(
      sticker => !sticker.coletada
    )
  }

  return resultado.filter(
    sticker =>
      sticker.nome
        .toLowerCase()
        .includes(
          pesquisa.value.toLowerCase()
        ) ||
      sticker.selecao
        .toLowerCase()
        .includes(
          pesquisa.value.toLowerCase()
        )
  )
})
</script>

<style scoped>
ion-content {
  --background: #f2f5f2;
}

.stats-card {
  background: linear-gradient(
    135deg,
    #006847,
    #009c5b
  );
  color: white;
  text-align: center;
  border-radius: 18px;
  margin-bottom: 20px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}

.stats-card h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.stats-card p {
  font-size: 1rem;
  margin: 8px 0;
}

ion-searchbar {
  margin-bottom: 16px;
  --border-radius: 14px;
}

ion-segment {
  margin-bottom: 20px;
  background: white;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

ion-segment-button {
  border-radius: 10px;
  font-weight: 600;
}
</style>