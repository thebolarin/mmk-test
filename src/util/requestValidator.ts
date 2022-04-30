type validateSMSRequestData = {
    to: string,
    from: string,
    text: string
};

export const validateSMSRequest: any = async (data: validateSMSRequestData) => {
    if (!data.to)  return { status: false, message: "to is missing" };
    if (!data.from) return { status: false, message: "from is missing" };
    if (!data.text) return { status: false, message: "text is missing" };
    if (typeof (data.to) !== 'string' || data.to.length < 6 || data.to.length > 16) return { status: false, message: "to is invalid" };
    if (typeof (data.from) !== 'string' || data.from.length < 6 || data.from.length > 16)  return { status: false, message: "from is invalid" };
    if (typeof (data.text) !== 'string' || data.text.length < 1 || data.text.length > 120) return { status: false, message: "text is invalid" };

    return { status: true, message: "all good" }
}