import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Signup {
    name: string;
    email: string;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export interface backendInterface {
    addSignup(name: string, email: string): Promise<void>;
    addSignupWithPhone(name: string, email: string, phone: string): Promise<void>;
    getSignupCount(): Promise<bigint>;
    getSignups(): Promise<Array<Signup>>;
}
