export interface LoginPayload {
    UserName: string;
    UserPassword: string
}

export interface LoginResp {
    message: string;
    result:  boolean;
    data:    Data;
}

export interface Data {
    custId:   number;
    name:     string;
    mobileNo: string;
    password: string;
}

