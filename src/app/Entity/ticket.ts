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

    id : Number
    name : string
    emailId : string
    phoneNumber : Number
    actualDate : string
    state : string
    pinCode : Number
    issuingAuthority : string
    reason : string
    amount : Number
    timePeriod : Number
    paid : Boolean
    
}