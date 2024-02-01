import {
    Box,
    Container,
    Stack,
} from "@chakra-ui/react"
import LogoMeteoFrance from "../../../public/logo.png"
import LogoRepublique from "../../../public/logo2.png"
import Image from "next/image"
import { useRouter } from "next/router"

export default function SmallCentered() {
    const router = useRouter()
    return (
        <Box>

            <Box
                borderTopWidth={1}
                borderStyle={"solid"}

            >
                <Container as={Stack} maxW={"6xl"} py={4} spacing={4} align={"center"}>
                    <Stack direction={"row"} spacing={6} >
                        <div>
                            <Image src={LogoMeteoFrance} alt="img meteo france" style={{ width: "100px", height: "100px" }} onClick={() => { router.push("/") }} />
                        </div>
                        <Image src={LogoRepublique} alt="img republique" style={{ width: "100px", height: "100px" }} onClick={() => { router.push("/") }} />
                    </Stack>
                </Container>
            </Box>
            <Box
                borderTopWidth={1}
                borderStyle={"solid"}
                bgColor={"#036ba1"}
            >
                <Container as={Stack} maxW={"6xl"} py={4} spacing={4} align={"center"}>
                    <p style={{ color: "white" }}>© 2023 Copyright - Météo-France</p>
                </Container>

            </Box>
        </Box>
    )
}
