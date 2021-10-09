import icons from './iconsList.json'
import {IIcons} from '../interfaces'

export function iconsMark(iconId: number): string {
    const prefix = 'wi wi-';
    const newIconID = String(iconId);
    const newIcons: IIcons = icons;
    let icon = newIcons[newIconID].icon;

    if (!(iconId > 699 && iconId < 800) && !(iconId > 899 && iconId < 1000)) {
        icon = 'day-' + icon;
    }

    return prefix + icon;
}
