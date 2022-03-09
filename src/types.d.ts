interface IVehicle {
  id: number | string;
  model: string;
  make: string;
  year: number;
  grade: string;
  imageSrc: string;
}

interface IVehicles {
  vehicles: IVehicle[]
}


interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface IUsers {
  users: IUser[]
}

interface IBooking {
  userId: number,
  vehicleId: number
  price: number,
  contactPersonId: number
  bookDate: Date
  dateFrom: Date,
  dateTo: Date,
}

type notUndefined = string | number | boolean | symbol | object

interface IDictionary<T extends notUndefined = notUndefined> {
  [key: string]: T | undefined;
}


type TCheckoutMode = 'user' | 'guest'
type TCheckoutStatus = 'pending' | 'finished' | 'error'
