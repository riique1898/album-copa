<template>
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>👤 Perfil</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">

      <IonCard>

        <IonCardHeader>
          <IonCardTitle>Henrique Araujo</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>

          <p>Email: henrique@email.com</p>

          <p>
            Figurinhas coletadas:
            {{ coletadas }}
          </p>

          <IonButton
            expand="block"
            color="danger"
          >
            Sair
          </IonButton>

        </IonCardContent>

      </IonCard>

    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/vue'

import { useAlbum } from '@/composables/useAlbum'

const { lista } = useAlbum()

const coletadas = computed(
  () =>
    lista.value.filter(
      s => s.coletada
    ).length
)
</script>