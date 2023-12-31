import React, { useState, useContext } from "react"
import { AiOutlineSearch, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router"

import ResearchBar from "@/components/researchBar"
import AfficherFavoris from "@/components/afficheFavoris"
import Logo from "@/components/logo"

import LogoMeteoFrance from "../../../public/logo.png"
import LogoRepublique from "../../../public/logo2.png"

import FavorisContext from "@/context/favorisCountryContext"

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import {
    Box,
    Flex,
    IconButton,
    Stack,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react"


export default function WithSubnavigation(props: { username?: string, isLoaded: any }) {
    const { isOpen, onToggle } = useDisclosure()
    const router = useRouter()
    const [searchVille, setSearchVille] = useState<any>("")
    const [isVisible, setIsVisible] = useState<any>(false)
    const { addFavoris, favoris, setIsExist, isExist, isVisibleIcon, setIsVisibleIcon } = useContext(FavorisContext)
    const [coordonnees, setCoordonnees] = useState<any>({})
    const [selected, setSelected] = useState<any>(false)
    const [isError, setIsError] = useState<any>(false)

    const rechercherVilleMeteo = () => {
        if (selected) {
            setIsError(false)
            let test = false
            favoris.forEach((element: any) => {
                if (decodeURIComponent(element.ville) == searchVille) {
                    test = true
                }

            });

            if (test) {
                setIsExist(true)
            }
            else {
                setIsExist(false)
            }
            router.push(`/${searchVille}?lat=${coordonnees.lat}&lng=${coordonnees.lng}`)

        }
        else {
            setIsError(true)
        }
    }



    const afficheFavoris = async () => {
        if (isVisibleIcon) {
            setIsVisibleIcon(false)
        }
        if (isVisible) {
            setIsVisible(false)
            setIsVisibleIcon(true)
        }
        else {
            setIsVisible(true)
        }
    }

    return (
        <Box>
            <Flex
                id="flexNavBar"
                bg={useColorModeValue("white", "black")}
                color={useColorModeValue("black", "white")}
                minH={"60px"}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                align={"center"}

            // mr={"15%"}
            // ml={"15%"}
            // bgColor={"red"}
            >
                <div id="navBar" style={{ marginRight: "1%" }}>
                    <Logo image={LogoRepublique} />
                </div> <div id="navBar" style={{ marginRight: "1%" }}>
                    <Logo image={LogoMeteoFrance} />
                </div>
                {/* <div style={{ display: "flex" }}> */}
                <div id="iconFavoris2" style={{ display: "flex" }}>
                    <Logo image={LogoMeteoFrance} />
                    <button
                        id="buttonhome"
                        style={{
                            padding: "5%",
                            fontSize: "13px",
                            fontFamily: "'Raleway', sans-serif",
                        }}
                        onClick={() => afficheFavoris()}
                    >

                        {isVisibleIcon ? <AiFillHeart color={"#036ba1"} size={40} style={{ marginRight: "auto", marginLeft: "auto" }} /> : <AiOutlineClose color={"red"} size={40} style={{ marginRight: "auto", marginLeft: "auto" }} />}
                        <p style={{ fontVariantCaps: "small-caps" }}>liste des favoris</p>

                    </button>
                </div>
                <Flex id="ppp" justify={{ base: "center", md: "start" }}>

                    <div id="divNavBar" style={{ display: "flex", position: "relative", marginRight: "auto" }}>
                        <div>
                            <ResearchBar isLoaded={props.isLoaded} setSearchVille={setSearchVille} setCoordonnees={setCoordonnees} setSelected={setSelected} />
                            {isError ? <p style={{ color: "red", fontSize: "10px" }}><i>Vous n'avez pas sélectionné une ville</i></p> : ""}
                        </div>
                        <AiOutlineSearch onClick={() => { rechercherVilleMeteo() }} size={25} style={{ position: "absolute", right: 0, marginTop: "2%", marginRight: "2%", cursor: "pointer" }} color={"grey"} />

                    </div>

                </Flex>
                <Stack justify={"flex-end"} direction={"row"} spacing={6}>
                    <div id="iconFavoris">
                        <button
                            id="buttonhome"
                            style={{
                                padding: "5%",
                                fontSize: "13px",
                                fontFamily: "'Raleway', sans-serif",
                            }}
                            onClick={() => afficheFavoris()}
                        >

                            {isVisibleIcon ? <AiFillHeart color={"#036ba1"} size={40} style={{ marginRight: "auto", marginLeft: "auto" }} /> : <AiOutlineClose color={"red"} size={40} style={{ marginRight: "auto", marginLeft: "auto" }} />}
                            <p style={{ fontVariantCaps: "small-caps" }}>liste des favoris</p>

                        </button></div>

                </Stack>
                <div id="afficheFavoris">
                    <AfficherFavoris isVisible={isVisible} setIsVisible={setIsVisible} setIsVisibleIcon={setIsVisibleIcon} />
                </div>
            </Flex>
            <div style={{ width: "100%", height: "20px", backgroundColor: "#036ba1" }}></div>
        </Box>
    )
}
