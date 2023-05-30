// This function is used to format the number to currency format
export function convertNumberToString(num: number): string {
    const num_parts = num.toString().split(".");
    // Prints numbers with commas
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}