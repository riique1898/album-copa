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
          Total de Figurinhas:
          {{ lista.length }}
        </IonCardContent>
      </IonCard>

      <IonList>

        <IonItem
          v-for="sticker in lista"
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
  IonCheckbox
} from '@ionic/vue'

import { useAlbum } from '@/composables/useAlbum'

const {
  lista,
  toggleColetada
} = useAlbum()
</script>