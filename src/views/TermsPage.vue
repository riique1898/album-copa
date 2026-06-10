<template>
  <IonPage>

    <AppHeader
      titulo="📄 Termo de Uso"
      cor="primary"
    />

    <IonContent class="ion-padding">

      <h2>Termo de Uso</h2>

      <p>
        Este aplicativo foi desenvolvido para fins acadêmicos
        como atividade da disciplina de Desenvolvimento Web.
      </p>

      <p>
        O usuário concorda em utilizar o aplicativo apenas
        para fins educacionais e de demonstração.
      </p>

      <p>
        As informações cadastradas são armazenadas apenas
        em memória e podem ser perdidas ao encerrar a aplicação.
      </p>

      <p>
        O desenvolvedor não se responsabiliza por perdas
        de dados decorrentes do uso da aplicação.
      </p>

    </IonContent>

  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent
} from '@ionic/vue'

import AppHeader from '@/components/AppHeader.vue'
</script>