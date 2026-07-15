<template>
  <IonPage>
    <IonTabs>

      <IonRouterOutlet />

      <IonTabBar slot="bottom">

        <IonTabButton tab="album" href="/tabs/tab1">
          <IonIcon :icon="albumsOutline" />
          <IonLabel>Álbum</IonLabel>
        </IonTabButton>

        <IonTabButton tab="coletadas" href="/tabs/tab2">
          <IonIcon :icon="starOutline" />
          <IonLabel>Coletadas</IonLabel>
        </IonTabButton>

        <IonTabButton tab="perfil" href="/tabs/tab3">
          <IonIcon :icon="personOutline" />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>

        <IonTabButton tab="conquistas" href="/tabs/tab4">
          <IonIcon :icon="trophyOutline" />
          <IonLabel>Conquistas</IonLabel>
        </IonTabButton>

        <IonTabButton tab="estatisticas" href="/tabs/stats">
          <IonIcon :icon="statsChartOutline" />
          <IonLabel>Estatisticas</IonLabel>
        </IonTabButton>

      </IonTabBar>

    </IonTabs>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonRouterOutlet
} from '@ionic/vue'

import {
  albumsOutline,
  statsChartOutline,
  trophyOutline,
  starOutline,
  personOutline
} from 'ionicons/icons'
</script>
