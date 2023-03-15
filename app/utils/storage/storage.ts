import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key)
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string): Promise<any | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key)
    return JSON.parse(almostThere)
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: any): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key)
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear()
  } catch {}
}

// Yeni bir arkadaş eklemek için
export async function addFriend( friend ): Promise<boolean> {
  try {
    const friends = await AsyncStorage.getItem('friends'); // Arkadaş listesini getir
    const friendsArray = friends ? JSON.parse(friends) : []; // Arkadaş listesini diziye dönüştür veya boş bir dizi oluştur
    friendsArray.push(friend); // Yeni arkadaşı ekle
    await AsyncStorage.setItem('friends', JSON.stringify(friendsArray)); // Güncellenmiş arkadaş listesini kaydet
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Tüm arkadaşları getirmek için
export async function getFriends(): Promise<any | null> {
  try {
    const friends = await AsyncStorage.getItem('friends'); // Arkadaş listesini getir
    return friends ? JSON.parse(friends) : []; // Arkadaş listesini diziye dönüştür veya boş bir dizi oluştur
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Bir arkadaşı silmek için
export async function removeFriend(friendIndex: any): Promise<void> {
  try {
    const friends = await AsyncStorage.getItem('friends'); // Arkadaş listesini getir
    const friendsArray = friends ? JSON.parse(friends) : []; // Arkadaş listesini diziye dönüştür veya boş bir dizi oluştur
    friendsArray.splice(friendIndex, 1); // Belirtilen indeksteki arkadaşı sil
    await AsyncStorage.setItem('friends', JSON.stringify(friendsArray)); // Güncellenmiş arkadaş listesini kaydet
  } catch {}
}

