<template>
  <IonPage>
    <IonHeader>
      <IonToolbar color="success">
        <IonTitle>🏆 Álbum da Copa</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <h2>Bem-vindo ao seu álbum!</h2>

      <IonCard>
        <IonCardContent>
          Total de figurinhas: 50
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardContent>
          Coletadas: 12
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardContent>
          Pendentes: 38
        </IonCardContent>
      </IonCard>
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
  IonCardContent
} from '@ionic/vue'
</script>