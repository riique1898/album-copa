import { ref } from 'vue'

import {
  atualizarFavorito,
  atualizarStatus,
  estatisticasAlbum,
  listarFigurinhas,
  rankingColecionador,
  ultimasColetadas,
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
const ranking = ref({
  pontuacao: 0,
  nivel: 'Bronze',
  pontosProximoNivel: 101 as number | null,
  progressoProximoNivel: 0
})
const ultimas = ref<any[]>([])

export function useAlbum() {
  const { getUser } = useAuth()

  function userId() {
    return Number(getUser()?.id || 0)
  }

  async function carregarFigurinhas(
    filtro: StickerFilter = 'todas',
    texto = '',
    ordemColeta: 'asc' | 'desc' | null = null
  ) {
    if (!userId()) return

    lista.value = await listarFigurinhas(userId(), filtro, texto, ordemColeta)
    estatisticas.value = await estatisticasAlbum(userId())
    ranking.value = await rankingColecionador(userId())
    ultimas.value = await ultimasColetadas(userId())
  }

  async function carregarColetadas(ordem: 'asc' | 'desc' = 'desc') {
    await carregarFigurinhas('coletadas', '', ordem)
  }

  async function carregarPendentes() {
    await carregarFigurinhas('pendentes')
  }

  async function buscar(texto: string) {
    await carregarFigurinhas('todas', texto)
  }

  async function carregarFavoritas() {
    await carregarFigurinhas('favoritas')
  }

  async function carregarUltimasColetadas() {
    if (!userId()) return

    ultimas.value = await ultimasColetadas(userId())
  }

  async function toggleColetada(id: number) {
    const item = lista.value.find(i => i.id === id)
    if (!item || !userId()) return

    const novoStatus = item.coletada === 1 ? 0 : 1

    await atualizarStatus(userId(), id, novoStatus)
    await carregarFigurinhas()
  }

  async function toggleFavorita(id: number) {
    const item = lista.value.find(i => i.id === id)
    if (!item || !userId()) return

    const novoStatus = item.favorite === 1 ? 0 : 1

    await atualizarFavorito(userId(), id, novoStatus)
    await carregarFigurinhas()
  }

  return {
    lista,
    estatisticas,
    ranking,
    ultimas,
    carregarFigurinhas,
    carregarColetadas,
    carregarPendentes,
    carregarFavoritas,
    carregarUltimasColetadas,
    buscar,
    toggleColetada,
    toggleFavorita
  }
}
