// use api.gov.ua API/ naming convention : https://api.gov.au/standards/national_api_standards/naming-conventions.html

/* vehicle */
interface IVehicle {
  id: number | string;
  model: string;
  make: string;
  year: number;
  grade: string;
  imageSrc: string;
  parameters: object;
  isAvailable: boolean,
  internalInfo?: {
    vin: string;
    dates: {
      purchaseDate: Date,
      lastServiceDateTime: Date
    },
    purchasePrice: number;
  },
}

interface IVehicles {
  vehicles: IVehicle[]
}

/* user */
interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
}

interface IUsers {
  users: IUser[]
}

/* booking */
type TBookingStatus = 'PAYMENT_PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED'

interface IBooking {
  userId: number,
  status: TBookingStatus,
  vehicleId: number
  price: number,
  contactPersonId: number
  lastBookDateTime: Date
  dateTimeFrom: Date,
  dateTimeTo: Date,
}

type notUndefined = string | number | boolean | symbol | object

interface IDictionary<T extends notUndefined = notUndefined> {
  [key: string]: T | undefined;
}


type TCheckoutMode = 'user' | 'guest'
type TCheckoutStatus = 'pending' | 'finished' | 'error'
