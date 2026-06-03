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
            {{ usuario?.nome || 'Usuário' }}
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>

          <p>
            Email:
            {{ usuario?.email || '-' }}
          </p>

          <p>
            Figurinhas coletadas:
            {{ coletadas }}
          </p>

          <IonButton
            expand="block"
            color="danger"
            @click="sair"
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
import { useRouter } from 'vue-router'

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
import { useAuth } from '@/composables/useAuth'

const router = useRouter()

const { lista } = useAlbum()
const { usuarioLogado, logout } = useAuth()

const usuario = usuarioLogado

const coletadas = computed(
  () =>
    lista.value.filter(
      s => s.coletada
    ).length
)

function sair() {
  logout()
  router.push('/login')
}
</script>

<style scoped>
ion-content {
  --background: #f4f7f5;
}

ion-card {
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

ion-card-title {
  font-size: 1.4rem;
  color: #1565c0;
}

ion-card-content p {
  margin: 10px 0;
  font-size: 1rem;
}

ion-button {
  margin-top: 20px;
}
</style>