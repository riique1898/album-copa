<template>
  <IonPage>

    <AppHeader
      titulo="👤 Perfil"
      cor="primary"
    />

    <IonContent class="ion-padding">

      <IonCard class="perfil-card">

        <IonCardHeader>

          <div class="avatar">
            👤
          </div>

          <IonCardTitle>
            {{ usuario?.nome || 'Usuário' }}
          </IonCardTitle>

        </IonCardHeader>

        <IonCardContent>

          <p>
            📧 {{ usuario?.email || '-' }}
          </p>

          <p>
            ⚽ Figurinhas coletadas:
            {{ coletadas }}
          </p>

          <IonButton
            expand="block"
            color="primary"
            router-link="/about"
          >
            ℹ️ Sobre o Aplicativo
          </IonButton>

          <IonButton
            expand="block"
            color="danger"
            @click="sair"
          >
            🚪 Sair
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

.perfil-card {
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.avatar {
  width: 90px;
  height: 90px;
  margin: 0 auto 15px auto;
  border-radius: 50%;
  background: #1976d2;
  color: white;
  font-size: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

ion-card-title {
  font-size: 1.5rem;
  color: #1565c0;
  font-weight: 700;
}

ion-card-content p {
  margin: 12px 0;
  font-size: 1rem;
}

ion-button {
  margin-top: 12px;
}
</style>