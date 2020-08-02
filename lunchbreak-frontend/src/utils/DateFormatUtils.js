export default function getFormattedDate(currentDate) {
    currentDate = new Date(currentDate);
    return currentDate.getDate() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear();
}