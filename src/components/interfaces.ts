export interface IError {
    value?: string,
    msg: string,
    param: string
}

export interface IPart {
    _id: string;
    name: string;
    manufacturer: string;
    price: number;
    tags: ITag[];
    createdAt?: Date;
    photo?: any
}

export interface ITag {
    _id?: string;
    name: string;
}

interface OpeningHours {
    [day: string]: {
        open: string;
        close: string;
    };
}

export interface ILocation {
    _id: string;
    zip: string;
    street: string;
    city: string;
    country: string;
    openingHours: OpeningHours[];
    phoneNumber: string;
    email: string
}

export interface IInventory {
    _id?: string;
    part?: IPart;
    location?: ILocation;
    available: number
}

export interface ICampaignItem {
    name: string;
    description: string;
    image: string
}

export interface ILocationMapProps {
    city: string;
    street: string
    options?: object
}