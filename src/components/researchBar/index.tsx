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

export default function Index() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDbr6FgqPsctO5kXmIFoYL7X7TuaXAGX_o",
        libraries: ["places"],
    })

    if (!isLoaded) return <div>Loading...</div>
    return <Map />
}
function Map() {
    const [selected, setSelected] = useState(null)
    return (
        <div>
            <div>
                <PlacesAutocomplete setSearchVille={props.setSearchVille} setSearchVille={props.setSearchVille} selected={selected} setSelected={setSelected} />
            </div>
        </div>
    )
}

const PlacesAutocomplete = (props: { selected: any; setSelected: any }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete()

    const handleSelect = async (address: any) => {
        setValue(address, false)
        clearSuggestions()
        const results = await getGeocode({ address })
        const { lat, lng } = getLatLng(results[0])
        props.setSelected({ lat, lng })
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