

export default async function (session) {
  await import('firebase/storage')

  const storageService = session.storage()
  return storageService
}
