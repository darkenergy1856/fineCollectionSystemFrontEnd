/*
    private Long id;
    private string name;
    private string emailId;
    private Long phoneNumber;
    private string actualDate;
    private string state;
    private int pinCode;
    private string issuingAuthority;
    private string reason;
    private int amount;
    private int timePeriod;
    private boolean paid;
 */


export interface Ticket{

    id : number
    name : string
    emailId : string
    phoneNumber : number
    actualDate : string
    state : string
    pinCode : number
    issuingAuthority : string
    reason : string
    amount : number
    timePeriod : number
    paid : boolean
    
}