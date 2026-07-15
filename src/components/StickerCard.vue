<template>
  <IonCard
    class="sticker-card"
    :class="{ brilhante: sticker.raridade === 'Brilhante' }"
  >
    <div class="sticker-header">
      <img
        :src="sticker.foto"
        alt="Jogador"
        class="foto-jogador"
      />
    </div>

    <IonCardHeader>
      <IonButton
        class="favorite-button"
        fill="clear"
        :color="sticker.favorite ? 'warning' : 'medium'"
        @click="$emit('favorite')"
      >
        <IonIcon
          slot="icon-only"
          :icon="sticker.favorite ? star : starOutline"
        />
      </IonButton>

      <IonCardTitle>
        {{ sticker.nome }}
      </IonCardTitle>

      <div class="selecao">
        {{ sticker.selecao }} | {{ sticker.colecao }}
      </div>
    </IonCardHeader>

    <IonCardContent>
      <IonChip :color="corRaridade">
        {{ sticker.raridade }}
      </IonChip>

      <IonChip :color="sticker.coletada ? 'success' : 'danger'">
        {{ sticker.coletada ? 'Coletada' : 'Pendente' }}
      </IonChip>

      <IonChip
        v-if="sticker.favorite"
        color="warning"
      >
        Favorita
      </IonChip>

      <p
        v-if="sticker.coletada && sticker.data_coleta"
        class="collection-date"
      >
        Coletada em {{ formatarData(sticker.data_coleta) }}
      </p>

      <IonButton
        expand="block"
        color="success"
        @click="$emit('toggle')"
      >
        Alterar Status
      </IonButton>
    </IonCardContent>
  </IonCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonButton,
  IonIcon
} from '@ionic/vue'
import {
  star,
  starOutline
} from 'ionicons/icons'

const props = defineProps({
  sticker: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle', 'favorite'])

const corRaridade = computed(() => {
  switch (props.sticker.raridade) {
    case 'Brilhante':
      return 'warning'
    case 'Rara':
      return 'primary'
    default:
      return 'medium'
  }
})

function formatarData(data: string) {
  return new Date(data).toLocaleString('pt-BR')
}
</script>

<style scoped>
.sticker-card {
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid #ddd;
  background: white;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.brilhante {
  border: 4px solid gold;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
}

.sticker-header {
  padding: 12px;
}

.foto-jogador {
  width: 100%;
  height: 280px;
  object-fit: cover;
  object-position: top center;
  border-radius: 8px;
}

ion-card-header {
  position: relative;
  text-align: center;
}

.favorite-button {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 44px;
  height: 44px;
}

ion-card-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.selecao {
  margin-top: 5px;
  color: #666;
}

ion-card-content {
  text-align: center;
}

ion-chip {
  margin: 6px;
}

.collection-date {
  color: #666;
  margin: 8px 0 12px;
  font-size: 0.92rem;
}
</style>
