import { ref } from 'vue'

import {
  listarConquistas,
  verificarConquistas
} from '@/services/database'

const conquistas = ref<any[]>([])

export function useAchievements() {

  async function carregarConquistas(userId: number) {

    await verificarConquistas(userId)

    conquistas.value = await listarConquistas(userId)

  }

  return {

    conquistas,

    carregarConquistas

  }

}