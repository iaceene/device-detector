import { db } from "./db.js"

export type DeviceType = "mobile" | "desktop" | "tablet" | "TV" | "ROBOT" | "other"

export type MetaData = {
    UserAgent: string,
    Platform: string,
    Language: string,
    Browser: string,
    Product: string
}

export default class DeviceDedector{

    private device: MetaData = {
        UserAgent: navigator.userAgent,
        Platform: navigator.platform,
        Language: navigator.language,
        Browser: navigator.vendor,
        Product: navigator.userAgent.slice(navigator.userAgent.indexOf("(") + 1, navigator.userAgent.indexOf(")"))
    }
    private Devicetype: DeviceType;

    constructor(){
        this.Devicetype = this.Parse();
    }

    private Parse(): DeviceType{
        const product: string | undefined = this.device.Product.split(';')[0]?.toLocaleLowerCase()
        const fullProduct: string = this.device.Product.toLowerCase();
        // Macintosh; Intel Mac OS X 10_15_7
        // desktop
        // Windows NT 6.1; Win64; x64; rv:47.0
        // desktop
        // Linux; Android 10; K
        // android device
        /// ...
        
        if (product == undefined)
            return ("ROBOT")
        
        // Check for Android first (appears after "Linux;" in product string)
        if (fullProduct.includes('android')) {
            // Check if it's an Android tablet
            if (db.TABLET.split(' ').some(keyword => fullProduct.includes(keyword.toLowerCase())))
                return ("tablet");
            // Otherwise it's a mobile device
            return ("mobile");
        }
        
        if (db.TV.split(' ').some(keyword => fullProduct.includes(keyword.toLowerCase())))
            return ("TV");
        else if (db.TABLET.split(' ').some(keyword => fullProduct.includes(keyword.toLowerCase())))
            return ("tablet");
        else if (db.MOBILE.split(' ').some(keyword => fullProduct.includes(keyword.toLowerCase())))
            return ("mobile");
        else if (db.Desktop.split(' ').some(keyword => product.includes(keyword.toLowerCase())))
            return ("desktop");
        return ("other");
    }

    Type(): DeviceType{
        return (this.Devicetype);
    }

    GetMetaData(): MetaData{
        return (this.device)
    }
    Browser(): string{
        return (this.device.Browser)
    }
    UserAgent(): string{
        return (this.device.UserAgent)
    }
    Language(): string{
        return (this.device.Language)
    }
    Platform(): string{
        return (this.device.Platform)
    }
    Product(): string{
        return (this.device.Product)
    }
}
