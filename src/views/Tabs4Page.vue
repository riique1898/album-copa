<template>
  <IonPage>
    <AppHeader
      titulo="Conquistas"
      cor="tertiary"
    />

    <IonContent class="ion-padding">
      <IonCard class="progress-card">
        <IonCardHeader>
          <IonCardTitle>Progresso do Álbum</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonProgressBar :value="progressoAlbum" />
          <p>{{ Math.round(progressoAlbum * 100) }}% concluído</p>

          <IonBadge color="tertiary">
            {{ totalDesbloqueadas }} de {{ conquistas.length }} conquistas desbloqueadas
          </IonBadge>
        </IonCardContent>
      </IonCard>

      <IonCard
        v-for="conquista in conquistas"
        :key="conquista.id"
        class="achievement-card"
        :class="{ bloqueada: !conquista.desbloqueada }"
      >
        <IonCardHeader>
          <div class="achievement-title">
            <IonIcon :icon="iconeConquista(conquista.icone)" />

            <div>
              <IonCardTitle>{{ conquista.nome }}</IonCardTitle>
              <p>{{ conquista.descricao }}</p>
            </div>
          </div>
        </IonCardHeader>

        <IonCardContent>
          <IonBadge
            :color="conquista.desbloqueada ? 'success' : 'medium'"
          >
            {{ conquista.desbloqueada ? 'Desbloqueada' : 'Bloqueada' }}
          </IonBadge>

          <p class="date">
            Data de desbloqueio:
            {{ formatarData(conquista.data_desbloqueio) }}
          </p>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { onIonViewWillEnter } from '@ionic/vue'

import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonProgressBar
} from '@ionic/vue'

import {
  albumsOutline,
  constructOutline,
  diamondOutline,
  flagOutline,
  footballOutline,
  medalOutline,
  podiumOutline,
  ribbonOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
  starOutline,
  trophyOutline
} from 'ionicons/icons'

import AppHeader from '@/components/AppHeader.vue'
import { useAchievements } from '@/composables/useAchievements'

const { conquistas, progressoAlbum, carregarConquistas } = useAchievements()

const totalDesbloqueadas = computed(() =>
  conquistas.value.filter(conquista => conquista.desbloqueada).length
)

const icones: Record<string, string> = {
  'albums-outline': albumsOutline,
  'construct-outline': constructOutline,
  'diamond-outline': diamondOutline,
  'flag-outline': flagOutline,
  'football-outline': footballOutline,
  'medal-outline': medalOutline,
  'podium-outline': podiumOutline,
  'ribbon-outline': ribbonOutline,
  'shield-checkmark-outline': shieldCheckmarkOutline,
  'sparkles-outline': sparklesOutline,
  'star-outline': starOutline,
  'trophy-outline': trophyOutline
}

function iconeConquista(nome: string) {
  return icones[nome] || trophyOutline
}

function formatarData(data?: string) {
  if (!data) return '-'

  return new Date(data).toLocaleDateString('pt-BR')
}

onIonViewWillEnter(carregarConquistas)
</script>

<style scoped>
ion-content {
  --background: #f4f7f5;
}

.progress-card,
.achievement-card {
  border-radius: 8px;
}

.progress-card p {
  margin: 12px 0 0;
  color: #555;
}

.achievement-card {
  border-left: 5px solid var(--ion-color-success);
}

.achievement-card.bloqueada {
  border-left-color: var(--ion-color-medium);
  opacity: 0.72;
}

.achievement-title {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 12px;
  align-items: center;
}

.achievement-title ion-icon {
  width: 38px;
  height: 38px;
  color: var(--ion-color-tertiary);
}

.achievement-title ion-card-title {
  font-size: 1.05rem;
  line-height: 1.2;
}

.achievement-title p,
.date {
  color: #666;
  margin: 6px 0 0;
}

ion-badge {
  margin-bottom: 8px;
}
</style>
