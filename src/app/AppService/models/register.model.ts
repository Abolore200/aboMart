export interface RegisterCustomerPayload {
    CustId:   number;
    Name:     string;
    MobileNo: string;
    Password: string;
}

export interface RegisterCustomerResp {
    message: string;
    result:  boolean;
    data:    null;
}
