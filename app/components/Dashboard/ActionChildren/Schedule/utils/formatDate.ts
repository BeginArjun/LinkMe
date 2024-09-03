function addZeros(time : number) {
    let newTime : string = time.toString();
    if (time < 10) {
        newTime = "0" + time;
    }
    return newTime;
}


export function formatDate(date : Date) {
    const year = date.getFullYear();
    const month = addZeros(date.getMonth() + 1);
    const day = addZeros(date.getDate());
    const hours = addZeros(date.getHours());
    const minutes = addZeros(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}