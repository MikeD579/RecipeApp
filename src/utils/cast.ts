export default {
    castData: (data: any, casts: { [key: string]: (val: any) => any }) => {
        const castedData: any = {};
        for (const key in data) {
            if (casts[key]) {
                castedData[key] = casts[key](data[key]);
            }
        }
        return { ...data, ...castedData };
    }
}