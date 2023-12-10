import React, { useState, useEffect, useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.css"

export default function Index(props: { setSearchVille: any, isLoaded: any }) {
    // const { isLoaded } = useLoadScript({
    //     // googleMapsApiKey: "AIzaSyDbr6FgqPsctO5kXmIFoYL7X7TuaXAGX_o",
    //     libraries: ["places"],
    // })
    console.log(props.isLoaded, "isloadee")
    if (!props.isLoaded) return <div>Loading...</div>
    return <Map setSearchVille={props.setSearchVille} />
}
function Map(props: { setSearchVille: any }) {
    const [selected, setSelected] = useState<any>("")
    return (
        <div>
            <div>
                <PlacesAutocomplete setSearchVille={props.setSearchVille} selected={selected} setSelected={setSelected} />
            </div>
        </div>
    )
}

const PlacesAutocomplete = (props: { selected: any; setSelected: any, setSearchVille: any }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            types: ['geocode'],
            // 
            // componentRestrictions: {
            //     country: 'fr',
            // },
            // types: ['(cities)', '(fr)'],
        }
    })

    const handleSelect = async (address: any) => {
        setValue(address, false)
        clearSuggestions()
        const results = await getGeocode({ address })
        const { lat, lng } = getLatLng(results[0])
        // props.setSelected({ lat, lng })
        props.setSearchVille(address.split(",")[0])

    }

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={e => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Search an adress"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data
                            .filter(({ types }) =>
                                types.includes("locality")
                            )

                            .filter(({ terms }) =>
                                terms.some(obj => obj.value === 'France') == true
                            )

                            .map(({ place_id, description }) => (
                                <ComboboxOption key={place_id} value={description} />
                            ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}