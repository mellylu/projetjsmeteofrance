import React, { useState } from "react"

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.css"


export default function Index(props: { setSearchVille: any, isLoaded: any, setCoordonnees: any }) {
    if (!props.isLoaded) return <div>Loading...</div>
    return <Map setSearchVille={props.setSearchVille} setCoordonnees={props.setCoordonnees} />
}
function Map(props: { setSearchVille: any, setCoordonnees: any }) {
    const [selected, setSelected] = useState<any>("")
    return (
        <div>
            <div>
                <PlacesAutocomplete setSearchVille={props.setSearchVille} selected={selected} setSelected={setSelected} setCoordonnees={props.setCoordonnees} />
            </div>
        </div>
    )
}

const PlacesAutocomplete = (props: { selected: any; setSelected: any, setSearchVille: any, setCoordonnees: any }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            types: ['geocode'],
        }
    })

    const handleSelect = async (address: any) => {
        setValue(address, false)
        clearSuggestions()
        const results = await getGeocode({ address })
        const { lat, lng } = getLatLng(results[0])
        props.setSearchVille(address.split(",")[0])
        props.setCoordonnees({ "lat": lat, "lng": lng })
    }

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={e => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Rechercher une ville ...."
                style={{ width: "300px", padding: "3%", border: "1px solid grey", borderRadius: 5, fontSize: 12, color: "grey" }}
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