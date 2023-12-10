export const weatherDescription = (icon: string) => {
    if (icon.includes('01')) return 'Ciel dégagé'
    if (icon.includes('02')) return 'Peu Nuageux'
    if (icon.includes('03')) return 'Partiellement nuageux'
    if (icon.includes('04')) return 'Couvert'
    if (icon.includes('09')) return 'Pluie violente'
    if (icon.includes('10')) return 'Légère pluie'
    if (icon.includes('11')) return 'Orage'
    if (icon.includes('13')) return 'Neige'
    if (icon.includes('50')) return 'Brouillard'
}