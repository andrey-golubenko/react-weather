export function getHourlyTime(timestamp: number): string {
    const tmDate = new Date(timestamp * 1000);
    return `${tmDate.getHours()} : ${tmDate.getMinutes()}0`
}