import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string
const dbName = 'steamdb'
const collectionName = 'games'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const gameName = searchParams.get('game')?.trim()

    if (!gameName) {
      return NextResponse.json(
        { error: 'Missing game parameter' },
        { status: 400 }
      )
    }

    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    // Criando um índice de texto para pesquisa eficiente (execute isso uma vez)
    // await collection.createIndex({ name: "text" });

    // Opção 1: Pesquisa com expressão regular (case insensitive)
    const regexQuery = new RegExp(gameName, 'i');
    
    // Opção 2: Pesquisa por texto com classificação de relevância
    const textSearchQuery = { $text: { $search: gameName } };
    
    // Opção 3: Pesquisa usando o operador $regex com caracteres parciais
    const partialMatchQuery = { name: { $regex: regexQuery } };

    // Combinando abordagens para resultados melhores
    const games = await collection.find({
      $or: [
        partialMatchQuery,
        // Descomente a linha abaixo se você ativar o índice de texto
        // textSearchQuery
      ]
    })
    .limit(10)  // Limita os resultados para evitar sobrecarga
    .toArray();

    await client.close()

    if (games.length === 0) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      )
    }

    // Se encontrar uma correspondência exata, retorna esse resultado primeiro
    const exactMatch = games.find(game => 
      game.name.toLowerCase() === gameName.toLowerCase()
    );

    if (exactMatch) {
      return NextResponse.json({ appid: exactMatch.appid, name: exactMatch.name })
    }

    // Caso contrário, retorna todos os jogos correspondentes
    return NextResponse.json({ 
      results: games.map(game => ({ 
        appid: game.appid,
        name: game.name
      }))
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}