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