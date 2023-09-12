import {MMKV} from 'react-native-mmkv'
import {StateStorage} from 'zustand/middleware'

export const appStorageId = 'app-storage'

export const mmkvAuthStorage = new MMKV({id: appStorageId})

export const zustandStorage: StateStorage = {
  setItem(key: string, value: string) {
    mmkvAuthStorage.set(key, value)
  },
  getItem(name: string) {
    return mmkvAuthStorage.getString(name) ?? null
  },
  removeItem(name) {
    mmkvAuthStorage.delete(name)
  },
}
