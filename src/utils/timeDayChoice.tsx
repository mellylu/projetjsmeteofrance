export const timeDayChoice = (timeDaySelected: any, temps: any) => {
    return temps?.map((t: any) => {
        if (t.nuit && timeDaySelected.selected === "nuit") {
            return {
                ...t,
                degres: t.nuit.average,
                temps: t.nuit.icon
            };
        } else if (t.matin && timeDaySelected.selected === "matin") {
            return {
                ...t,
                degres: t.matin.average,
                temps: t.matin.icon
            };
        } else if (t.apresMidi && timeDaySelected.selected === "apresMidi") {
            return {
                ...t,
                degres: t.apresMidi.average,
                temps: t.apresMidi.icon
            };
        } else if (t.soiree && timeDaySelected.selected === "soiree") {
            return {
                ...t,
                degres: t.soiree.average,
                temps: t.soiree.icon
            };
        }
        return t;
    });
};