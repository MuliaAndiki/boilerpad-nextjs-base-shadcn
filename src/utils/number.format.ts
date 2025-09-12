export function formatNumber(num: number, isCurrency = false) {
    if (isCurrency) {
        return num.toLocaleString("en-US", {
            style: "currency",
            currency: "IDR",
        });
    }

    return num.toLocaleString("en-US");
}
