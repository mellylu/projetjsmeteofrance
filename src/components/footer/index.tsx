import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from "@chakra-ui/react"
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import { ReactNode } from "react"
import LogoMeteoFrance from "../../../public/logo.png"
import LogoRepublique from "../../../public/logo2.png"
import Image from "next/image"

const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode
    label: string
    href: string
}) => {
    return (
        <chakra.button
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            rounded={"full"}
            w={8}
            h={8}
            cursor={"pointer"}
            as={"a"}
            href={href}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"background 0.3s ease"}
            _hover={{
                bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    )
}

export default function SmallCentered() {
    return (
        <Box>


            <Box
                borderTopWidth={1}
                borderStyle={"solid"}
                w={500}
                h={500}
            >
                <Container as={Stack} maxW={"6xl"} py={4} spacing={4} align={"center"}>
                    <Stack direction={"row"} spacing={6}>

                        <SocialButton label={"Logo meteo france"} href={"/"}>
                            <Image src={LogoMeteoFrance} alt="img meteo france" />

                        </SocialButton>
                        <SocialButton label={"logo republique française"} href={"/"}>
                            <Image src={LogoRepublique} alt="img republique" />

                        </SocialButton>
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
