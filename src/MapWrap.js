import { createContext } from 'react'
import Mymap from './components/Mymap'
const Context = createContext()

export default function MapWrap({ latLng }) {
    const value = {lng: latLng[1], lat: latLng[0]}
    return (
        <Context.Provider value={value}>
            <Mymap />
        </Context.Provider> 
    )
}