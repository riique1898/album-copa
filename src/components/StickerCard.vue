<template>
  <IonCard class="sticker-card">

    <div class="sticker-header">
      <img
        :src="sticker.foto"
        alt="Jogador"
        class="foto-jogador"
      />
    </div>

    <IonCardHeader>
      <IonCardTitle>
        {{ sticker.nome }}
      </IonCardTitle>

      <div class="selecao">
        🇧🇷 {{ sticker.selecao }}
      </div>
    </IonCardHeader>

    <IonCardContent>

      <IonChip
        :color="sticker.coletada ? 'success' : 'danger'"
      >
        {{
          sticker.coletada
            ? '✓ Coletada'
            : '✗ Pendente'
        }}
      </IonChip>

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
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonButton
} from '@ionic/vue'

defineProps({
  sticker: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle'])
</script>

<style scoped>
.sticker-card {
  overflow: hidden;
  border-radius: 18px;
  border: 3px solid #d4af37;
  background: white;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
}

.sticker-header {
  background: linear-gradient(
    135deg,
    #f8f8f8,
    #eaeaea
  );
  padding: 12px;
}

.foto-jogador {
  width: 100%;
  height: 280px;
  object-fit: cover;
  object-position: top center;
  border-radius: 12px;
}

ion-card-header {
  text-align: center;
  padding-bottom: 8px;
}

ion-card-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #111;
}

.selecao {
  margin-top: 6px;
  color: #666;
  font-size: 0.95rem;
}

ion-card-content {
  text-align: center;
}

ion-chip {
  margin: 10px 0 15px 0;
}

ion-button {
  --border-radius: 10px;
  font-weight: 700;
}
</style>