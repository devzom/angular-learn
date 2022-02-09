interface IVehicle {
  id: number | string;
  model: string;
  make: string;
  year: number;
  class?: string;
  imageSrc?: string;
  dailyPrice?: number;
}


type notUndefined = string | number | boolean | symbol | object;

interface Dictionary<T extends notUndefined = notUndefined> {
  [key: string]: T | undefined;
}

