import { SetStorage } from '@/data/protocols/cache/set.storage'

export class LocalStorageAdapter implements SetStorage{
  set(key: string, value: object): void {  
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else { 
      localStorage.removeItem(key)
    }
  }
  get(key: string): any {  
   return  JSON.parse(localStorage.getItem(key))
  }
}
  