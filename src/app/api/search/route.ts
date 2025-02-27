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

    const gameDoc = await collection.findOne({ name: gameName })

    await client.close()

    if (!gameDoc) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ appid: gameDoc.appid })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
