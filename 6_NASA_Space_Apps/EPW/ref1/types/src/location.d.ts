export type Location = {
    ip: string;
    degrees: [number, number];
    radians: [number, number];
    accuracy: number;
    position: [number, number, number];
};
export declare function getIPLocation(): Promise<Location>;
//# sourceMappingURL=location.d.ts.map