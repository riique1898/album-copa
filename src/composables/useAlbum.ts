import { ref } from 'vue'

import {
  listarFigurinhas,
  listarColetadas,
  listarPendentes,
  pesquisarFigurinha,
  atualizarStatus
} from '@/services/database'

const lista = ref<any[]>([])

export function useAlbum() {

  async function carregarFigurinhas() {
    lista.value = await listarFigurinhas()
  }

  async function carregarColetadas() {
    lista.value = await listarColetadas()
  }

  async function carregarPendentes() {
    lista.value = await listarPendentes()
  }

  async function buscar(texto: string) {
    if (!texto) {
      return carregarFigurinhas()
    }

    lista.value = await pesquisarFigurinha(texto)
  }

  async function toggleColetada(id: number) {

    const figurinha = lista.value.find(f => f.id === id)
    if (!figurinha) return

    const novoStatus = figurinha.coletada === 1 ? 0 : 1

    await atualizarStatus(id, novoStatus)

    // importante: recarrega mantendo contexto atual
    await carregarFigurinhas()
  }

  // inicial
  carregarFigurinhas()

  return {
    lista,
    carregarFigurinhas,
    carregarColetadas,
    carregarPendentes,
    buscar,
    toggleColetada
  }
}