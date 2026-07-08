import { ref } from 'vue'

import {
  atualizarStatus,
  estatisticasAlbum,
  listarFigurinhas,
  type StickerFilter
} from '@/services/database'
import { useAuth } from '@/composables/useAuth'

const lista = ref<any[]>([])
const estatisticas = ref({
  total: 0,
  coletadas: 0,
  pendentes: 0,
  raras: 0,
  brilhantes: 0,
  percentual: 0
})

export function useAlbum() {
  const { getUser } = useAuth()

  function userId() {
    return Number(getUser()?.id || 0)
  }

  async function carregarFigurinhas(
    filtro: StickerFilter = 'todas',
    texto = ''
  ) {
    if (!userId()) return

    lista.value = await listarFigurinhas(userId(), filtro, texto)
    estatisticas.value = await estatisticasAlbum(userId())
  }

  async function carregarColetadas() {
    await carregarFigurinhas('coletadas')
  }

  async function carregarPendentes() {
    await carregarFigurinhas('pendentes')
  }

  async function buscar(texto: string) {
    await carregarFigurinhas('todas', texto)
  }

  async function toggleColetada(id: number) {
    const item = lista.value.find(i => i.id === id)
    if (!item || !userId()) return

    const novoStatus = item.coletada === 1 ? 0 : 1

    await atualizarStatus(userId(), id, novoStatus)
    await carregarFigurinhas()
  }

  return {
    lista,
    estatisticas,
    carregarFigurinhas,
    carregarColetadas,
    carregarPendentes,
    buscar,
    toggleColetada
  }
}
