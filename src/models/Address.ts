interface Address{
    id: string
    name: string
    address: string
    coordinates: {
        lat: number
        lon: number
    }
}

export default Address