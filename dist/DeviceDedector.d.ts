type DeviceType = "mobile" | "desktop" | "tablet" | "TV" | "ROBOT" | "other";
type MetaData = {
    UserAgent: string;
    Platform: string;
    Language: string;
    Browser: string;
    Product: string;
};
export default class DeviceDedector {
    private device;
    private Devicetype;
    constructor();
    private Parse;
    Type(): DeviceType;
    GetMetaData(): MetaData;
    Browser(): string;
    UserAgent(): string;
    Language(): string;
    Platform(): string;
    Product(): string;
}
export {};
//# sourceMappingURL=DeviceDedector.d.ts.map