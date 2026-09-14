export enum VehicleFeaturesType {
    WiFi = 'wi-fi',
    ChildSeat = 'child-seat',
    PetFriendly = 'pet-friendly',
}

export type DriverType = {
    id: number
    name: string
    phoneNumber: string
    email: string
    vehicleMake: string
    vehicleModel: string
    vehicleYear: number
    vehicleLicensePlate: string
    vehicleDescription: string | null,
    vehicleFeatures: VehicleFeaturesType[]
    createdAt: Date
}