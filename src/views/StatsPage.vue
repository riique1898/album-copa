<template>
  <IonPage>
    <AppHeader
      titulo="Estatísticas"
      cor="success"
    />

    <IonContent class="ion-padding">
      <IonCard class="summary-card">
        <IonCardHeader>
          <IonCardTitle>Progresso do Álbum</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <div class="progress-row">
            <IonBadge color="success">
              {{ estatisticas.percentual }}%
            </IonBadge>
            <span>{{ estatisticas.coletadas }} de {{ estatisticas.total }}</span>
          </div>

          <IonProgressBar :value="estatisticas.percentual / 100" />
        </IonCardContent>
      </IonCard>

      <div class="stats-grid">
        <IonCard>
          <IonCardContent>
            <IonBadge color="primary">{{ estatisticas.total }}</IonBadge>
            <p>Total cadastradas</p>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonBadge color="success">{{ estatisticas.coletadas }}</IonBadge>
            <p>Coletadas</p>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonBadge color="danger">{{ estatisticas.pendentes }}</IonBadge>
            <p>Faltantes</p>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonBadge color="tertiary">{{ estatisticas.raras }}</IonBadge>
            <p>Raras coletadas</p>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonBadge color="warning">{{ estatisticas.brilhantes }}</IonBadge>
            <p>Brilhantes coletadas</p>
          </IonCardContent>
        </IonCard>
      </div>

      <IonCard class="ranking-card">
        <IonCardHeader>
          <IonCardTitle>Ranking de Colecionador</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <div class="progress-row">
            <IonBadge color="dark">{{ ranking.pontuacao }} pontos</IonBadge>
            <IonBadge :color="corNivel">{{ ranking.nivel }}</IonBadge>
          </div>

          <IonProgressBar :value="ranking.progressoProximoNivel" />

          <p>
            {{ textoProximoNivel }}
          </p>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Progresso por Coleção</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <div
            v-for="colecao in colecoes"
            :key="colecao.colecao"
            class="collection-progress"
          >
            <div class="progress-row">
              <strong>{{ colecao.colecao }}</strong>
              <IonBadge color="primary">
                {{ colecao.percentual }}%
              </IonBadge>
            </div>

            <IonProgressBar :value="colecao.percentual / 100" />

            <p>
              {{ colecao.coletadas }} de {{ colecao.total }} figurinhas coletadas
            </p>
          </div>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Últimas 10 coletas</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonList>
            <IonItem
              v-for="sticker in ultimas"
              :key="sticker.id"
            >
              <IonLabel>
                <h2>{{ sticker.nome }}</h2>
                <p>{{ sticker.selecao }} | {{ sticker.raridade }}</p>
                <p>{{ formatarData(sticker.data_coleta) }}</p>
              </IonLabel>
            </IonItem>
          </IonList>

          <p
            v-if="ultimas.length === 0"
            class="vazio"
          >
            Nenhuma coleta registrada.
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
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonProgressBar
} from '@ionic/vue'

import AppHeader from '@/components/AppHeader.vue'
import { useAlbum } from '@/composables/useAlbum'

const {
  estatisticas,
  ranking,
  ultimas,
  colecoes,
  carregarFigurinhas
} = useAlbum()

const corNivel = computed(() => {
  switch (ranking.value.nivel) {
    case 'Diamante':
      return 'tertiary'
    case 'Ouro':
      return 'warning'
    case 'Prata':
      return 'medium'
    default:
      return 'success'
  }
})

const textoProximoNivel = computed(() => {
  if (!ranking.value.pontosProximoNivel) {
    return 'Nível máximo alcançado.'
  }

  const faltam = ranking.value.pontosProximoNivel - ranking.value.pontuacao
  return `Faltam ${faltam} pontos para o próximo nível.`
})

function formatarData(data?: string) {
  if (!data) return '-'

  return new Date(data).toLocaleString('pt-BR')
}

onIonViewWillEnter(carregarFigurinhas)
</script>

<style scoped>
ion-content {
  --background: #f4f7f5;
}

ion-card {
  border-radius: 8px;
}

.summary-card {
  border-left: 5px solid var(--ion-color-success);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}

.stats-grid ion-card {
  margin: 0;
}

.stats-grid ion-card-content {
  min-height: 96px;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 8px;
  text-align: center;
}

.stats-grid p,
.ranking-card p,
.collection-progress p,
.vazio {
  color: #666;
  margin: 0;
}

.collection-progress {
  margin-bottom: 18px;
}

.collection-progress:last-child {
  margin-bottom: 0;
}

.progress-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

ion-progress-bar {
  height: 10px;
  border-radius: 999px;
}

ion-list {
  background: transparent;
}

ion-item {
  --background: white;
  border-radius: 8px;
  margin-bottom: 8px;
}

ion-item h2 {
  font-weight: 700;
}
</style>
