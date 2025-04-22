import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    // console.log('DB is already connected.')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      // serverSelectionTimeoutMS: 30000,
      // socketTimeoutMS: 45000,
    })

    isConnected = true

    console.log('DB connected successfully.')
  } catch (error) {
    console.log('DB: ', error)
  }
}

export const disconnectToDB = async () => {
  if (!isConnected) {
    console.log('DB is already disconnected.')
    return
  }

  try {
    await mongoose.disconnect()
    isConnected = false
    console.log('DB disconnected successfully.')
  } catch (error) {
    console.log('Error disconnecting from DB:', error)
  }
}