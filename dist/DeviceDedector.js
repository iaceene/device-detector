import { db } from "./db.js";
export default class DeviceDedector {
    device = {
        UserAgent: navigator.userAgent,
        Platform: navigator.platform,
        Language: navigator.language,
        Browser: navigator.vendor,
        Product: navigator.userAgent.slice(navigator.userAgent.indexOf("(") + 1, navigator.userAgent.indexOf(")"))
    };
    Devicetype;
    constructor() {
        this.Devicetype = this.Parse();
    }
    Parse() {
        const product = this.device.Product.split(';')[0]?.toLocaleLowerCase();
        // Macintosh; Intel Mac OS X 10_15_7
        // desktop
        // Windows NT 6.1; Win64; x64; rv:47.0
        // desktop
        // Linux; Android 10; K
        // android device
        /// ...
        if (product == undefined)
            return ("ROBOT");
        if (db.TV.split(' ').some(keyword => product.includes(keyword.toLowerCase())))
            return ("TV");
        else if (db.TABLET.split(' ').some(keyword => product.includes(keyword.toLowerCase())))
            return ("tablet");
        else if (db.MOBILE.split(' ').some(keyword => product.includes(keyword.toLowerCase())))
            return ("mobile");
        else if (db.Desktop.split(' ').some(keyword => product.includes(keyword.toLowerCase())))
            return ("desktop");
        return ("other");
    }
    Type() {
        return (this.Devicetype);
    }
    GetMetaData() {
        return (this.device);
    }
    Browser() {
        return (this.device.Browser);
    }
    UserAgent() {
        return (this.device.UserAgent);
    }
    Language() {
        return (this.device.Language);
    }
    Platform() {
        return (this.device.Platform);
    }
    Product() {
        return (this.device.Product);
    }
}
//# sourceMappingURL=DeviceDedector.js.map