export const formatNumber = (number: number, separator = ',') => {
    const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    };
    const formatted = Intl.NumberFormat('en-US', options).format(number);
    return separator ? formatted.replace(/,/g, separator) : formatted;
};
