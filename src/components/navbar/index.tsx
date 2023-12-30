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
    const [isVisibleIcon, setIsVisibleIcon] = useState<any>(true)
    const { addFavoris, favoris, setIsExist, isExist } = useContext(FavorisContext)
    const [coordonnees, setCoordonnees] = useState<any>({})

    const rechercherVilleMeteo = () => {
        let test = false
        favoris.forEach(element => {
            if (decodeURIComponent(element) == searchVille) {
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
                <div id="navBar" style={{ marginRight: '20px' }}>
                    <Logo image={LogoRepublique} />
                </div> <div id="navBar">
                    <Logo image={LogoMeteoFrance} />
                </div>
                {/* <div style={{ display: "flex" }}> */}
                <div id="iconFavoris2">
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
                <Flex id="ppp" justify={{ base: "center", md: "start" }}>{/*flex={{ base: 1 }} */}

                    <div id="divNavBar" style={{ display: "flex", position: "relative", marginRight: "auto" }}>

                        <ResearchBar isLoaded={props.isLoaded} setSearchVille={setSearchVille} setCoordonnees={setCoordonnees} />
                        <AiOutlineSearch onClick={() => { rechercherVilleMeteo() }} size={25} style={{ position: "absolute", right: 0, marginTop: "2%", marginRight: "2%", cursor: "pointer" }} color={"grey"} />
                        {/* <div id="navBar2">
                            {isVisibleIcon ? <AiFillHeart color={"#036ba1"} size={40} style={{ marginRight: "auto", marginLeft: "auto" }} /> : <AiOutlineClose color={"red"} size={40} style={{ marginRight: "auto", marginLeft: "auto" }} />}

                        </div> */}
                    </div>
                </Flex>
                {/* </div> */}
                <Stack justify={"flex-end"} direction={"row"} spacing={6}>{/* , md: 5  */}
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

            {/* <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse> */}
            <div style={{ width: "100%", height: "20px", backgroundColor: "#036ba1" }}></div>
        </Box>
    )
}

// const DesktopNav = () => {
//     const linkColor = useColorModeValue("black", "black")
//     const linkHoverColor = useColorModeValue("black", "white")
//     const popoverContentBgColor = useColorModeValue("white", "black")

//     return (
//         <Stack direction={"row"} spacing={20}>
//             {NAV_ITEMS.map(navItem => (
//                 <Box key={navItem.label}>
//                     <Popover trigger={"hover"} placement={"bottom-start"}>
//                         <PopoverTrigger>
//                             <Box
//                                 as="a"
//                                 p={2}
//                                 href={navItem.href ?? "#"}
//                                 fontSize={"sm"}
//                                 fontWeight={500}
//                                 color={linkColor}
//                                 margin="auto"
//                                 _hover={{
//                                     textDecoration: "none",
//                                     color: linkHoverColor,
//                                 }}
//                             >
//                                 {navItem.label}
//                             </Box>
//                         </PopoverTrigger>

//                         {navItem.children && (
//                             <PopoverContent
//                                 border={0}
//                                 boxShadow={"xl"}
//                                 bg={popoverContentBgColor}
//                                 p={4}
//                                 rounded={"xl"}
//                                 minW={"sm"}
//                             >
//                                 <Stack>
//                                     {navItem.children.map(child => (
//                                         <DesktopSubNav key={child.label} {...child} />
//                                     ))}
//                                 </Stack>
//                             </PopoverContent>
//                         )}
//                     </Popover>
//                 </Box>
//             ))}
//         </Stack>
//     )
// }

// const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
//     return (
//         <Box
//             as="a"
//             href={href}
//             role={"group"}
//             display={"block"}
//             p={2}
//             rounded={"md"}
//             _hover={{ bg: useColorModeValue("black", "white") }}
//         >
//             <Stack direction={"row"} align={"center"}>
//                 <Box>
//                     <Text
//                         transition={"all .3s ease"}
//                         _groupHover={{ color: "black" }}
//                         fontWeight={500}
//                     >
//                         {label}
//                     </Text>
//                     <Text fontSize={"sm"}>{subLabel}</Text>
//                 </Box>
//                 <Flex
//                     transition={"all .3s ease"}
//                     transform={"translateX(-10px)"}
//                     opacity={0}
//                     _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
//                     justify={"flex-end"}
//                     align={"center"}
//                     flex={1}
//                 >
//                     <Icon color={"black"} w={5} h={5} as={ChevronRightIcon} />
//                 </Flex>
//             </Stack>
//         </Box>
//     )
// }

// const MobileNav = () => {
//     return (
//         <Stack bg={useColorModeValue("white", "#3b250e")} p={4} display={{ md: "none" }}>
//             {NAV_ITEMS.map(navItem => (
//                 <MobileNavItem key={navItem.label} {...navItem} />
//             ))}
//         </Stack>
//     )
// }

// const MobileNavItem = ({ label, children, href }: NavItem) => {
//     const { isOpen, onToggle } = useDisclosure()

//     return (
//         <Stack spacing={4} onClick={children && onToggle}>
//             <Box
//                 py={2}
//                 as="a"
//                 href={href ?? "#"}
//                 justifyContent="space-between"
//                 alignItems="center"
//                 _hover={{
//                     textDecoration: "none",
//                 }}
//             >
//                 <Text fontWeight={600} color={useColorModeValue("#3b250e", "#3b250e")}>
//                     {label}
//                 </Text>
//                 {children && (
//                     <Icon
//                         as={ChevronDownIcon}
//                         transition={"all .25s ease-in-out"}
//                         transform={isOpen ? "rotate(180deg)" : ""}
//                         w={6}
//                         h={6}
//                     />
//                 )}
//             </Box>

//             <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
//                 <Stack
//                     mt={2}
//                     pl={4}
//                     borderLeft={1}
//                     borderStyle={"solid"}
//                     borderColor={useColorModeValue("#3b250e", "#3b250e")}
//                     align={"start"}
//                 >
//                     {children &&
//                         children.map(child => (
//                             <Box as="a" key={child.label} py={2} href={child.href}>
//                                 {child.label}
//                             </Box>
//                         ))}
//                 </Stack>
//             </Collapse>
//         </Stack>
//     )
// }

// interface NavItem {
//     label: string
//     subLabel?: string
//     children?: Array<NavItem>
//     href?: string
// }

// const NAV_ITEMS: Array<NavItem> = [
//     {
//         label: "Nos services",

//         href: "/services",
//     },
//     {
//         label: "A propos",

//         href: "#",
//     },
//     {
//         label: "Contact",
//         href: "#",
//     },
// ]
