<template>
  <IonPage>

    <AppHeader
      titulo="👤 Perfil"
      cor="primary"
    />

    <IonContent class="ion-padding">

      <IonCard>

        <IonCardHeader>
          <IonCardTitle>
            Henrique Araujo
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>

          <p>Email: admin@copa.com</p>

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
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/vue'

import AppHeader from '@/components/AppHeader.vue'
import { useAlbum } from '@/composables/useAlbum'

const { lista } = useAlbum()

const coletadas = computed(
  () =>
    lista.value.filter(
      s => s.coletada
    ).length
)
</script>