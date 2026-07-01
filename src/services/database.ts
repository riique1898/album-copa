import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite'

const dbName = 'appdata'

let db: SQLiteDBConnection | null = null
let initialized = false

const sqlite = new SQLiteConnection(CapacitorSQLite)

async function ensureDatabase() {

  if (initialized && db) return

  if (!db) {
    db = await sqlite.createConnection(
      dbName,
      false,
      'no-encryption',
      1,
      false
    )
  }

  await db.open()

  // ---------------- USUÁRIOS ----------------

  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuario(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    );
  `)

  // ---------------- FIGURINHAS ----------------

  await db.execute(`
    CREATE TABLE IF NOT EXISTS figurinha(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      selecao TEXT NOT NULL,
      foto TEXT NOT NULL,
      coletada INTEGER DEFAULT 0
    );
  `)

  initialized = true
}

function getDb() {

  if (!db) {
    throw new Error("Banco não inicializado.")
  }

  return db
}

export async function initDatabase() {

  await ensureDatabase()

  await popularFigurinhas()

}









//========================= USUÁRIOS =========================

export async function cadastrarUsuario(
  nome: string,
  email: string,
  senha: string
) {

  await ensureDatabase()

  return await getDb().run(
    `INSERT INTO usuario(nome,email,senha)
     VALUES(?,?,?)`,
    [nome,email,senha]
  )

}

export async function realizarLogin(
  email: string,
  senha: string
){

  await ensureDatabase()

  const resultado = await getDb().query(
    `SELECT * FROM usuario
     WHERE email = ?
     AND senha = ?`,
    [email,senha]
  )

  return resultado.values || []

}

export async function buscarUsuarioEmail(
  email:string
){

  await ensureDatabase()

  const resultado = await getDb().query(
    `SELECT * FROM usuario
     WHERE email = ?`,
    [email]
  )

  return resultado.values || []

}










//========================= FIGURINHAS =========================

export async function adicionarFigurinha(
  nome:string,
  selecao:string,
  foto:string
){

  await ensureDatabase()

  return await getDb().run(
    `INSERT INTO figurinha
    (nome,selecao,foto,coletada)
    VALUES(?,?,?,0)`,
    [nome,selecao,foto]
  )

}

export async function listarFigurinhas(){

  await ensureDatabase()

  const resultado = await getDb().query(
    `SELECT * FROM figurinha`
  )

  return resultado.values || []

}

export async function atualizarStatus(
  id:number,
  coletada:number
){

  await ensureDatabase()

  return await getDb().run(
    `UPDATE figurinha
     SET coletada = ?
     WHERE id = ?`,
    [coletada,id]
  )

}

export async function pesquisarFigurinha(
  texto:string
){

  await ensureDatabase()

  const resultado = await getDb().query(
    `SELECT *
     FROM figurinha
     WHERE nome LIKE ?
     OR selecao LIKE ?`,
    [`%${texto}%`,`%${texto}%`]
  )

  return resultado.values || []

}

export async function listarColetadas(){

  await ensureDatabase()

  const resultado = await getDb().query(
    `SELECT *
     FROM figurinha
     WHERE coletada = 1`
  )

  return resultado.values || []

}

export async function listarPendentes(){

  await ensureDatabase()

  const resultado = await getDb().query(
    `SELECT *
     FROM figurinha
     WHERE coletada = 0`
  )

  return resultado.values || []

}

//========================= POPULAR FIGURINHAS =========================

export async function popularFigurinhas() {

  await ensureDatabase()

  const resultado = await getDb().query(
    `SELECT COUNT(*) as total FROM figurinha`
  )

  const total = Number(
    resultado.values?.[0]?.total || 0
  )

  if (total > 0) return

  const figurinhas = [

    {
      nome: "Neymar Jr",
      selecao: "Brasil",
      foto: "https://images.hdqwalls.com/wallpapers/neymar-jr-fifa-world-cup-qatar-03.jpg",
      coletada: 1
    },

    {
      nome: "Vinicius Jr",
      selecao: "Brasil",
      foto: "https://th.bing.com/th/id/R.c25262870835a9c17483fe83813e1767?rik=z7l%2f7lsPeZIIwQ&pid=ImgRaw&r=0",
      coletada: 0
    },

    {
      nome: "Messi",
      selecao: "Argentina",
      foto: "https://static.foxnews.com/foxnews.com/content/uploads/2022/12/lionel-messi1.jpg",
      coletada: 1
    },

    {
      nome: "Mbappé",
      selecao: "França",
      foto: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf952620424022964/639f4446b5425c668e5f7b82/GettyImages-1450088331.jpg?auto=webp&format=pjpg&width=3840&quality=60",
      coletada: 0
    },

    {
      nome: "Cristiano Ronaldo",
      selecao: "Portugal",
      foto: "https://s2-monet.glbimg.com/sj2rub6OvBpKnCQG1ee3n_8jbKc=/0x0:3500x2335/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e7c91519bbbb4fadb4e509085746275d/internal_photos/bs/2025/V/p/rSTSLQT5AZw3nORUFKvQ/gettyimages-2247340680.jpg",
      coletada: 1
    }

  ]

  for (const figurinha of figurinhas) {

    await getDb().run(

      `INSERT INTO figurinha
      (nome, selecao, foto, coletada)
      VALUES (?, ?, ?, ?)`,

      [
        figurinha.nome,
        figurinha.selecao,
        figurinha.foto,
        figurinha.coletada
      ]

    )

  }

}