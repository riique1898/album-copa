<template>
  <IonPage>
    <IonHeader>
      <IonToolbar color="success">
        <IonTitle>🏆 Álbum da Copa</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">

      <IonCard>
        <IonCardContent>
          <h2>Total: {{ total }}</h2>
          <h2>Coletadas: {{ coletadas }}</h2>
          <h2>Pendentes: {{ pendentes }}</h2>
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

      <IonList>

        <IonItem
          v-for="sticker in figurinhasFiltradas"
          :key="sticker.id"
        >
          <IonLabel>
            <h2>{{ sticker.nome }}</h2>
            <p>{{ sticker.selecao }}</p>
          </IonLabel>

          <IonCheckbox
            :checked="sticker.coletada"
            @ionChange="toggleColetada(sticker.id)"
          />

        </IonItem>

      </IonList>

    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonSearchbar,
  IonSegment,
  IonSegmentButton
} from '@ionic/vue'

import { useAlbum } from '@/composables/useAlbum'

const {
  lista,
  toggleColetada
} = useAlbum()

const pesquisa = ref('')
const filtro = ref('todas')

const total = computed(
  () => lista.value.length
)

const coletadas = computed(
  () =>
    lista.value.filter(
      s => s.coletada
    ).length
)

const pendentes = computed(
  () =>
    total.value - coletadas.value
)

const figurinhasFiltradas = computed(() => {

  let resultado = lista.value

  if (filtro.value === 'coletadas') {
    resultado = resultado.filter(
      s => s.coletada
    )
  }

  if (filtro.value === 'pendentes') {
    resultado = resultado.filter(
      s => !s.coletada
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