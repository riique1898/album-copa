# 🏆 Álbum de Figurinhas da Copa do Mundo

Projeto desenvolvido com Vue 3 + Ionic para simular um aplicativo de álbum de figurinhas da Copa do Mundo.

## 📱 Sobre o projeto

O sistema simula um app de álbum digital onde o usuário pode:

- Criar conta (cadastro)
- Fazer login
- Recuperar senha (simulado)
- Visualizar figurinhas da Copa
- Marcar figurinhas como coletadas ou pendentes
- Filtrar e pesquisar jogadores
- Ver estatísticas do álbum
- Visualizar perfil do usuário

Todos os dados são armazenados em memória (vetores), sem banco de dados.

---

## 🚀 Tecnologias utilizadas

- Vue 3
- Ionic Framework
- TypeScript
- Vue Router
- Composables (useAuth e useAlbum)

---

## 📂 Estrutura do projeto


src/
├── components/
│ ├── AppHeader.vue
│ ├── StickerCard.vue
│ ├── StickerList.vue
│
├── composables/
│ ├── useAuth.ts
│ ├── useAlbum.ts
│
├── data/
│ ├── users.ts
│ ├── stickers.ts
│
├── views/
│ ├── LoginPage.vue
│ ├── RegisterPage.vue
│ ├── ResetPasswordPage.vue
│ ├── Tab1Page.vue
│ ├── Tab2Page.vue
│ ├── Tab3Page.vue
│ ├── TabsPage.vue
│
├── router/
│ ├── index.ts


---

## 🔐 Funcionalidades de autenticação

- Login com email e senha
- Cadastro de novos usuários
- Logout
- Validação simples de credenciais
- Recuperação de senha simulada

---

## ⚽ Funcionalidades do álbum

- Lista de figurinhas de jogadores
- Marcar figurinha como coletada ou pendente
- Contador de:
  - Total de figurinhas
  - Figurinhas coletadas
  - Figurinhas pendentes
- Pesquisa por nome ou seleção
- Filtros (todas / coletadas / pendentes)

---

## 🧠 Componentes e arquitetura

O projeto foi organizado com foco em componentização:

- `AppHeader`: cabeçalho reutilizável
- `StickerCard`: card de figurinha
- `StickerList`: lista de figurinhas

---

## ⚙️ Execução do projeto

```bash
npm install
ionic serve