interface IVehicle {
  id: number | string;
  model: string;
  make: string;
  year: number;
  grade: string;
  imageSrc?: string;
  dailyPrice?: number;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}


type notUndefined = string | number | boolean | symbol | object

interface Dictionary<T extends notUndefined = notUndefined> {
  [key: string]: T | undefined;
}


type TCheckoutMode = 'user' | 'guest'
type TCheckoutStatus = 'pending' | 'finished' | 'error'
