import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite'

const sqlite = new SQLiteConnection(CapacitorSQLite)

const dbName = 'appdata'

let db: SQLiteDBConnection | null = null

// =========================
// CONEXÃO
// =========================
async function getDb() {

  if (db) return db

  db = await sqlite.createConnection(
    dbName,
    false,
    'no-encryption',
    1,
    false
  )

  await db.open()

  return db
}

// =========================
// INIT BANCO
// =========================
export async function initDatabase() {

  const db = await getDb()

  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    );
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS figurinha (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      selecao TEXT NOT NULL,
      foto TEXT NOT NULL,
      coletada INTEGER DEFAULT 0
    );
  `)

  await db.execute(`
  CREATE TABLE IF NOT EXISTS achievement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    icone TEXT NOT NULL
  );
`)

await db.execute(`
  CREATE TABLE IF NOT EXISTS user_achievement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    achievement_id INTEGER NOT NULL,
    data_desbloqueio TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES usuario(id),
    FOREIGN KEY(achievement_id) REFERENCES achievement(id)
  );
`)

await popularFigurinhas()

await popularConquistas()
}

// =========================
// USUÁRIOS
// =========================
export async function cadastrarUsuario(nome: string, email: string, senha: string) {

  const db = await getDb()

  return db.run(
    `INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`,
    [nome, email, senha]
  )
}

export async function realizarLogin(email: string, senha: string) {

  const db = await getDb()

  const res = await db.query(
    `SELECT * FROM usuario WHERE email = ? AND senha = ?`,
    [email, senha]
  )

  return res.values || []
}

export async function buscarUsuarioEmail(email: string) {

  const db = await getDb()

  const res = await db.query(
    `SELECT * FROM usuario WHERE email = ?`,
    [email]
  )

  return res.values || []
}

// =========================
// FIGURINHAS
// =========================
export async function listarFigurinhas() {

  const db = await getDb()

  const res = await db.query(`SELECT * FROM figurinha`)

  return res.values || []
}

export async function listarColetadas() {

  const db = await getDb()

  const res = await db.query(
    `SELECT * FROM figurinha WHERE coletada = 1`
  )

  return res.values || []
}

export async function listarPendentes() {

  const db = await getDb()

  const res = await db.query(
    `SELECT * FROM figurinha WHERE coletada = 0`
  )

  return res.values || []
}

export async function pesquisarFigurinha(texto: string) {

  const db = await getDb()

  const res = await db.query(
    `SELECT * FROM figurinha
     WHERE nome LIKE ? OR selecao LIKE ?`,
    [`%${texto}%`, `%${texto}%`]
  )

  return res.values || []
}

export async function atualizarStatus(id: number, coletada: number) {

  const db = await getDb()

  return db.run(
    `UPDATE figurinha SET coletada = ? WHERE id = ?`,
    [coletada, id]
  )
}

// =========================
// POPULAR DADOS
// =========================
export async function popularFigurinhas() {

  const db = await getDb()

  const res = await db.query(
    `SELECT COUNT(*) as total FROM figurinha`
  )

  const total = Number(res.values?.[0]?.total || 0)

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
      foto: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf952620424022964/639f4446b5425c668e5f7b82/GettyImages-1450088331.jpg",
      coletada: 0
    },
    {
      nome: "Cristiano Ronaldo",
      selecao: "Portugal",
      foto: "https://s2-monet.glbimg.com/sj2rub6OvBpKnCQG1ee3n_8jbKc=/0x0:3500x2335/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e7c91519bbbb4fadb4e509085746275d/internal_photos/bs/2025/V/p/rSTSLQT5AZw3nORUFKvQ/gettyimages-2247340680.jpg",
      coletada: 1
    }
  ]

  for (const f of figurinhas) {

    await db.run(
      `INSERT INTO figurinha (nome, selecao, foto, coletada)
       VALUES (?, ?, ?, ?)`,
      [f.nome, f.selecao, f.foto, f.coletada]
    )
  }
}

export async function popularConquistas() {

  const db = await getDb()

  const res = await db.query(
    `SELECT COUNT(*) as total FROM achievement`
  )

  const total = Number(res.values?.[0]?.total || 0)

  if (total > 0) return

  const conquistas = [

    {
      nome: 'Primeira Figurinha',
      descricao: 'Colete sua primeira figurinha.',
      icone: '🥇'
    },

    {
      nome: 'Iniciante',
      descricao: 'Colete 10 figurinhas.',
      icone: '🎖️'
    },

    {
      nome: 'Colecionador',
      descricao: 'Colete 25 figurinhas.',
      icone: '📚'
    },

    {
      nome: 'Álbum em Construção',
      descricao: 'Colete 50 figurinhas.',
      icone: '🏆'
    },

    {
      nome: 'Caçador de Raras',
      descricao: 'Colete 5 figurinhas raras.',
      icone: '💎'
    },

    {
      nome: 'Especialista em Raras',
      descricao: 'Colete 15 figurinhas raras.',
      icone: '👑'
    },

    {
      nome: 'Brilho Inicial',
      descricao: 'Colete 3 figurinhas brilhantes.',
      icone: '✨'
    },

    {
      nome: 'Mestre das Brilhantes',
      descricao: 'Colete 10 figurinhas brilhantes.',
      icone: '🌟'
    },

    {
      nome: 'Álbum Quase Completo',
      descricao: 'Complete 80% do álbum.',
      icone: '🥈'
    },

    {
      nome: 'Campeão da Copa',
      descricao: 'Complete 100% do álbum.',
      icone: '🏅'
    }

  ]

  for (const conquista of conquistas) {

    await db.run(
      `INSERT INTO achievement
      (nome, descricao, icone)
      VALUES (?, ?, ?)`,
      [
        conquista.nome,
        conquista.descricao,
        conquista.icone
      ]
    )

  }

}

// =========================
// CONQUISTAS
// =========================

export async function listarConquistas(userId: number) {

  const db = await getDb()

  const res = await db.query(
    `
    SELECT
      a.id,
      a.nome,
      a.descricao,
      a.icone,
      ua.data_desbloqueio,
      CASE
        WHEN ua.id IS NULL THEN 0
        ELSE 1
      END AS desbloqueada
    FROM achievement a
    LEFT JOIN user_achievement ua
      ON ua.achievement_id = a.id
      AND ua.user_id = ?
    ORDER BY a.id
    `,
    [userId]
  )

  return res.values || []

}

export async function desbloquearConquista(
  userId: number,
  achievementId: number
) {

  const db = await getDb()

  const existe = await db.query(
    `
    SELECT *
    FROM user_achievement
    WHERE user_id = ?
    AND achievement_id = ?
    `,
    [userId, achievementId]
  )

  if ((existe.values?.length || 0) > 0) return

  await db.run(
    `
    INSERT INTO user_achievement
    (user_id, achievement_id, data_desbloqueio)
    VALUES (?, ?, ?)
    `,
    [
      userId,
      achievementId,
      new Date().toISOString()
    ]
  )

}

export async function verificarConquistas(userId: number) {

  const db = await getDb()

  const res = await db.query(
    `
    SELECT COUNT(*) as total
    FROM figurinha
    WHERE coletada = 1
    `
  )

  const coletadas = Number(res.values?.[0]?.total || 0)

  if (coletadas >= 1)
    await desbloquearConquista(userId, 1)

  if (coletadas >= 10)
    await desbloquearConquista(userId, 2)

  if (coletadas >= 25)
    await desbloquearConquista(userId, 3)

  if (coletadas >= 50)
    await desbloquearConquista(userId, 4)

}