import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite'

const sqlite = new SQLiteConnection(CapacitorSQLite)
const dbName = 'appdata'

let db: SQLiteDBConnection | null = null

export type StickerFilter = 'todas' | 'coletadas' | 'pendentes'

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

async function addColumnIfMissing(
  table: string,
  column: string,
  definition: string
) {
  const database = await getDb()
  const res = await database.query(`PRAGMA table_info(${table})`)
  const exists = (res.values || []).some((item: any) => item.name === column)

  if (!exists) {
    await database.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`)
  }
}

export async function initDatabase() {
  const database = await getDb()

  await database.execute(`
    CREATE TABLE IF NOT EXISTS usuario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    );
  `)

  await database.execute(`
    CREATE TABLE IF NOT EXISTS figurinha (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      selecao TEXT NOT NULL,
      foto TEXT NOT NULL,
      raridade TEXT NOT NULL DEFAULT 'Comum',
      colecao TEXT NOT NULL DEFAULT 'Base',
      coletada INTEGER NOT NULL DEFAULT 0
    );
  `)

  await addColumnIfMissing('figurinha', 'raridade', "TEXT NOT NULL DEFAULT 'Comum'")
  await addColumnIfMissing('figurinha', 'colecao', "TEXT NOT NULL DEFAULT 'Base'")
  await addColumnIfMissing('figurinha', 'coletada', 'INTEGER NOT NULL DEFAULT 0')

  await database.execute(`
    CREATE TABLE IF NOT EXISTS user_stickers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      sticker_id INTEGER NOT NULL,
      coletada INTEGER NOT NULL DEFAULT 0,
      data_coleta TEXT,
      UNIQUE(user_id, sticker_id),
      FOREIGN KEY(user_id) REFERENCES usuario(id),
      FOREIGN KEY(sticker_id) REFERENCES figurinha(id)
    );
  `)

  await database.execute(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chave TEXT UNIQUE NOT NULL,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      icone TEXT NOT NULL,
      tipo TEXT NOT NULL,
      alvo INTEGER NOT NULL DEFAULT 0,
      colecao TEXT
    );
  `)

  await database.execute(`
    CREATE TABLE IF NOT EXISTS user_achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      achievement_id INTEGER NOT NULL,
      data_desbloqueio TEXT NOT NULL,
      UNIQUE(user_id, achievement_id),
      FOREIGN KEY(user_id) REFERENCES usuario(id),
      FOREIGN KEY(achievement_id) REFERENCES achievements(id)
    );
  `)

  await popularFigurinhas()
  await popularConquistas()
}

export async function cadastrarUsuario(nome: string, email: string, senha: string) {
  const database = await getDb()

  return database.run(
    `INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`,
    [nome.trim(), email.trim().toLowerCase(), senha]
  )
}

export async function realizarLogin(email: string, senha: string) {
  const database = await getDb()
  const res = await database.query(
    `SELECT * FROM usuario WHERE email = ? AND senha = ?`,
    [email.trim().toLowerCase(), senha]
  )

  return res.values || []
}

export async function buscarUsuarioEmail(email: string) {
  const database = await getDb()
  const res = await database.query(
    `SELECT * FROM usuario WHERE email = ?`,
    [email.trim().toLowerCase()]
  )

  return res.values || []
}

async function garantirColecaoUsuario(userId: number) {
  const database = await getDb()

  await database.run(
    `
    INSERT OR IGNORE INTO user_stickers (user_id, sticker_id, coletada)
    SELECT ?, id, COALESCE(coletada, 0)
    FROM figurinha
    `,
    [userId]
  )
}

export async function listarFigurinhas(
  userId: number,
  filtro: StickerFilter = 'todas',
  texto = ''
) {
  const database = await getDb()
  await garantirColecaoUsuario(userId)

  const params: any[] = [userId]
  const where: string[] = []

  if (filtro === 'coletadas') where.push('us.coletada = 1')
  if (filtro === 'pendentes') where.push('us.coletada = 0')

  if (texto.trim()) {
    where.push('(f.nome LIKE ? OR f.selecao LIKE ? OR f.colecao LIKE ?)')
    params.push(`%${texto.trim()}%`, `%${texto.trim()}%`, `%${texto.trim()}%`)
  }

  const res = await database.query(
    `
    SELECT
      f.id,
      f.nome,
      f.selecao,
      f.foto,
      f.raridade,
      f.colecao,
      us.coletada,
      us.data_coleta
    FROM figurinha f
    INNER JOIN user_stickers us
      ON us.sticker_id = f.id
      AND us.user_id = ?
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY f.colecao, f.selecao, f.nome
    `,
    params
  )

  return res.values || []
}

export async function estatisticasAlbum(userId: number) {
  const database = await getDb()
  await garantirColecaoUsuario(userId)

  const res = await database.query(
    `
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN us.coletada = 1 THEN 1 ELSE 0 END) AS coletadas,
      SUM(CASE WHEN us.coletada = 1 AND f.raridade = 'Rara' THEN 1 ELSE 0 END) AS raras,
      SUM(CASE WHEN us.coletada = 1 AND f.raridade = 'Brilhante' THEN 1 ELSE 0 END) AS brilhantes
    FROM figurinha f
    INNER JOIN user_stickers us
      ON us.sticker_id = f.id
      AND us.user_id = ?
    `,
    [userId]
  )

  const row = res.values?.[0] || {}
  const total = Number(row.total || 0)
  const coletadas = Number(row.coletadas || 0)

  return {
    total,
    coletadas,
    pendentes: total - coletadas,
    raras: Number(row.raras || 0),
    brilhantes: Number(row.brilhantes || 0),
    percentual: total > 0 ? Math.round((coletadas / total) * 100) : 0
  }
}

export async function atualizarStatus(userId: number, stickerId: number, coletada: number) {
  const database = await getDb()
  await garantirColecaoUsuario(userId)

  await database.run(
    `
    UPDATE user_stickers
    SET coletada = ?,
        data_coleta = CASE WHEN ? = 1 THEN ? ELSE NULL END
    WHERE user_id = ?
    AND sticker_id = ?
    `,
    [coletada, coletada, new Date().toISOString(), userId, stickerId]
  )

  await verificarConquistas(userId)
}

export async function popularFigurinhas() {
  const database = await getDb()
  const res = await database.query(`SELECT COUNT(*) as total FROM figurinha`)
  const total = Number(res.values?.[0]?.total || 0)

  if (total > 0) return

  const selecoes = [
    'Brasil',
    'Argentina',
    'Franca',
    'Portugal',
    'Espanha',
    'Alemanha',
    'Inglaterra',
    'Uruguai',
    'Japao',
    'Marrocos'
  ]

  const jogadores = [
    'Neymar Jr',
    'Vinicius Jr',
    'Messi',
    'Mbappe',
    'Cristiano Ronaldo',
    'Bellingham',
    'Musiala',
    'Pedri',
    'Valverde',
    'Hakimi'
  ]

  for (let i = 0; i < 60; i += 1) {
    const raridade = i % 10 === 0 ? 'Brilhante' : i % 4 === 0 ? 'Rara' : 'Comum'
    const colecao = i < 20 ? 'Fase de Grupos' : i < 40 ? 'Mata-Mata' : 'Lendas'
    const jogador = jogadores[i % jogadores.length]
    const selecao = selecoes[i % selecoes.length]

    await database.run(
      `
      INSERT INTO figurinha (nome, selecao, foto, raridade, colecao)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        `${jogador} ${Math.floor(i / jogadores.length) + 1}`,
        selecao,
        `https://placehold.co/480x640/0b7a3b/ffffff?text=${encodeURIComponent(jogador)}`,
        raridade,
        colecao
      ]
    )
  }
}

export async function popularConquistas() {
  const database = await getDb()

  const conquistas = [
    ['primeira_figurinha', 'Primeira Figurinha', 'Desbloquear ao coletar a primeira figurinha.', 'medal-outline', 'total', 1, null],
    ['iniciante', 'Iniciante', 'Coletar 10 figurinhas.', 'ribbon-outline', 'total', 10, null],
    ['colecionador', 'Colecionador', 'Coletar 25 figurinhas.', 'albums-outline', 'total', 25, null],
    ['album_em_construcao', 'Album em Construcao', 'Coletar 50 figurinhas.', 'construct-outline', 'total', 50, null],
    ['cacador_de_raras', 'Cacador de Raras', 'Coletar 5 figurinhas raras.', 'diamond-outline', 'raras', 5, null],
    ['especialista_em_raras', 'Especialista em Raras', 'Coletar 15 figurinhas raras.', 'trophy-outline', 'raras', 15, null],
    ['brilho_inicial', 'Brilho Inicial', 'Coletar 3 figurinhas brilhantes.', 'sparkles-outline', 'brilhantes', 3, null],
    ['mestre_das_brilhantes', 'Mestre das Brilhantes', 'Coletar 10 figurinhas brilhantes.', 'star-outline', 'brilhantes', 10, null],
    ['album_quase_completo', 'Album Quase Completo', 'Completar 80% do album.', 'podium-outline', 'percentual', 80, null],
    ['campeao_da_copa', 'Campeao da Copa', 'Completar 100% do album.', 'football-outline', 'percentual', 100, null],
    ['fase_de_grupos', 'Fase de Grupos Completa', 'Completar a colecao Fase de Grupos.', 'flag-outline', 'colecao', 100, 'Fase de Grupos'],
    ['mata_mata', 'Mata-Mata Completo', 'Completar a colecao Mata-Mata.', 'shield-checkmark-outline', 'colecao', 100, 'Mata-Mata'],
    ['lendas', 'Lendas Completas', 'Completar a colecao Lendas.', 'sparkles-outline', 'colecao', 100, 'Lendas']
  ]

  for (const conquista of conquistas) {
    await database.run(
      `
      INSERT OR IGNORE INTO achievements
        (chave, nome, descricao, icone, tipo, alvo, colecao)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      conquista
    )
  }
}

export async function listarConquistas(userId: number) {
  const database = await getDb()
  await verificarConquistas(userId)

  const res = await database.query(
    `
    SELECT
      a.id,
      a.chave,
      a.nome,
      a.descricao,
      a.icone,
      a.tipo,
      a.alvo,
      a.colecao,
      ua.data_desbloqueio,
      CASE WHEN ua.id IS NULL THEN 0 ELSE 1 END AS desbloqueada
    FROM achievements a
    LEFT JOIN user_achievements ua
      ON ua.achievement_id = a.id
      AND ua.user_id = ?
    ORDER BY a.id
    `,
    [userId]
  )

  return res.values || []
}

export async function desbloquearConquista(userId: number, achievementId: number) {
  const database = await getDb()

  await database.run(
    `
    INSERT OR IGNORE INTO user_achievements
      (user_id, achievement_id, data_desbloqueio)
    VALUES (?, ?, ?)
    `,
    [userId, achievementId, new Date().toISOString()]
  )
}

async function percentualColecao(userId: number, colecao: string) {
  const database = await getDb()
  const res = await database.query(
    `
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN us.coletada = 1 THEN 1 ELSE 0 END) AS coletadas
    FROM figurinha f
    INNER JOIN user_stickers us
      ON us.sticker_id = f.id
      AND us.user_id = ?
    WHERE f.colecao = ?
    `,
    [userId, colecao]
  )

  const row = res.values?.[0] || {}
  const total = Number(row.total || 0)
  const coletadas = Number(row.coletadas || 0)

  return total > 0 ? Math.round((coletadas / total) * 100) : 0
}

export async function verificarConquistas(userId: number) {
  const database = await getDb()
  await garantirColecaoUsuario(userId)

  const stats = await estatisticasAlbum(userId)
  const res = await database.query(`SELECT * FROM achievements ORDER BY id`)
  const conquistas = res.values || []

  for (const conquista of conquistas) {
    let desbloqueou = false

    if (conquista.tipo === 'total') {
      desbloqueou = stats.coletadas >= Number(conquista.alvo)
    }

    if (conquista.tipo === 'raras') {
      desbloqueou = stats.raras >= Number(conquista.alvo)
    }

    if (conquista.tipo === 'brilhantes') {
      desbloqueou = stats.brilhantes >= Number(conquista.alvo)
    }

    if (conquista.tipo === 'percentual') {
      desbloqueou = stats.percentual >= Number(conquista.alvo)
    }

    if (conquista.tipo === 'colecao' && conquista.colecao) {
      const percentual = await percentualColecao(userId, conquista.colecao)
      desbloqueou = percentual >= Number(conquista.alvo)
    }

    if (desbloqueou) {
      await desbloquearConquista(userId, Number(conquista.id))
    }
  }
}
