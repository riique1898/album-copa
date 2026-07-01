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

  // =========================
  // CARREGAR TODAS
  // =========================
  async function carregarFigurinhas() {
    lista.value = await listarFigurinhas()
  }

  // =========================
  // FILTRO: COLETADAS (SQL)
  // =========================
  async function carregarColetadas() {
    lista.value = await listarColetadas()
  }

  // =========================
  // FILTRO: PENDENTES (SQL)
  // =========================
  async function carregarPendentes() {
    lista.value = await listarPendentes()
  }

  // =========================
  // BUSCA (SQL LIKE)
  // =========================
  async function buscar(texto: string) {
    if (!texto) {
      await carregarFigurinhas()
      return
    }

    lista.value = await pesquisarFigurinha(texto)
  }

  // =========================
  // TOGGLE COLETADA (UPDATE DB)
  // =========================
  async function toggleColetada(id: number) {

    const item = lista.value.find(i => i.id === id)

    if (!item) return

    const novoStatus = item.coletada === 1 ? 0 : 1

    await atualizarStatus(id, novoStatus)

    // recarrega do banco (garante persistência real)
    await carregarFigurinhas()
  }

  // =========================
  // INIT
  // =========================
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