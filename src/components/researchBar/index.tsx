import React, { useState, useContext } from "react"

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.css"


export default function Index(props: { setSearchVille: any, isLoaded: any, setCoordonnees: any, setSelected: any }) {
    if (!props.isLoaded) return <div>Loading...</div>
    return <Map setSearchVille={props.setSearchVille} setCoordonnees={props.setCoordonnees} setSelected={props.setSelected} />
}
function Map(props: { setSearchVille: any, setCoordonnees: any, setSelected: any }) {
    // const [selected, setSelected] = useState<any>(false)
    return (
        <div>
            <div>
                <PlacesAutocomplete setSearchVille={props.setSearchVille} setSelected={props.setSelected} setCoordonnees={props.setCoordonnees} />
            </div>
        </div>
    )
}

const PlacesAutocomplete = (props: { setSelected: any, setSearchVille: any, setCoordonnees: any }) => {
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
        props.setSelected(true)
    }

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                id="comboboxInput"
                value={value}
                onChange={e => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Rechercher une ville ...."
                style={{ padding: "3%", border: "1px solid grey", borderRadius: 5, fontSize: 12, color: "grey" }}
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