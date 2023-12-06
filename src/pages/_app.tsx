import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import "@/styles/globals.css"
import { FavorisCountryContextProvider } from "@/context/favorisCountryContext"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <FavorisCountryContextProvider>
                <Component {...pageProps} />
            </FavorisCountryContextProvider>
        </ChakraProvider>
    )
}
