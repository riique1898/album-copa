<template>
  <IonPage>
    <AppHeader
      titulo="Perfil"
      cor="primary"
    />

    <IonContent class="ion-padding">
      <IonCard class="perfil-card">
        <IonCardHeader>
          <div class="avatar">
            {{ iniciais }}
          </div>

          <IonCardTitle>
            {{ usuario?.nome || 'Usuario' }}
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <p>{{ usuario?.email || '-' }}</p>

          <p>
            Figurinhas coletadas:
            {{ estatisticas.coletadas }}
          </p>

          <IonButton
            expand="block"
            color="primary"
            router-link="/about"
          >
            Sobre o Aplicativo
          </IonButton>

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
import { onIonViewWillEnter } from '@ionic/vue'

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
const { estatisticas, carregarFigurinhas } = useAlbum()
const { usuarioLogado, logout, getUser } = useAuth()

const usuario = usuarioLogado

const iniciais = computed(() => {
  const nome = usuario.value?.nome || 'Usuario'
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte: string) => parte[0]?.toUpperCase())
    .join('')
})

function sair() {
  logout()
  router.replace('/login')
}

onIonViewWillEnter(async () => {
  getUser()
  await carregarFigurinhas()
})
</script>

<style scoped>
ion-content {
  --background: #f4f7f5;
}

.perfil-card {
  border-radius: 8px;
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
  font-size: 32px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

ion-card-title {
  font-size: 1.35rem;
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
