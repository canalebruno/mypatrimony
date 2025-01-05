export interface Record {
    date:Date,
    bank:number,
    value:number
    _id: string,
    user: string
}


export interface Bank {
    _id?:string,
    id:number,
    name:string,
    currency:string,
}

export interface Exchange {
    _id?:string,
    date:Date,
    value:number,
}

export interface ResponseData {
    success: boolean,
    messsage:string,
    // eslint-disable-next-line
    data: any
}