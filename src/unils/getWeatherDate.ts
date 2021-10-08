export function getWeatherDate (timestamp: number) : string {

    const tmDate = new Date(timestamp * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${days[tmDate.getDay()]}, ${months[tmDate.getMonth()]} ${tmDate.getDate()}`;
}
