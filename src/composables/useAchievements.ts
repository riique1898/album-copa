import { ref } from 'vue'

import {
  estatisticasAlbum,
  listarConquistas,
  verificarConquistas
} from '@/services/database'
import { useAuth } from '@/composables/useAuth'

const conquistas = ref<any[]>([])
const progressoAlbum = ref(0)

export function useAchievements() {
  const { getUser } = useAuth()

  async function carregarConquistas() {
    const userId = Number(getUser()?.id || 0)
    if (!userId) return

    await verificarConquistas(userId)
    conquistas.value = await listarConquistas(userId)

    const stats = await estatisticasAlbum(userId)
    progressoAlbum.value = stats.percentual / 100
  }

  return {
    conquistas,
    progressoAlbum,
    carregarConquistas
  }
}
