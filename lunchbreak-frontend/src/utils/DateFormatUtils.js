export default function getFormattedDate(currentDate) {
    currentDate = new Date();
    const formattedDate = currentDate.getDate() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear();
    return formattedDate;
}