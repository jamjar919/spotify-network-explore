export const colorFromString = (text: string) =>
    `#${((parseInt(text.replace(/[^\w\d]/g, ""), 36)) % 16777215).toString(16)}`;
