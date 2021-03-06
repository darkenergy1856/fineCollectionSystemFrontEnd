/*
    private Long id;
    private string name;
    private string emailId;
    private Long phoneNumber;
    private string actualDate;
    private int pinCode;
    private string issuingAuthority;
    private string reason;
    private int amount;
    private string dueDate;
    private boolean paid;
 */

export interface Ticket{

    id ?: number
    name : string
    emailId : string
    phoneNumber : number
    actualDate : string
    pinCode : number
    issuingAuthority : string
    itemIdentification : string
    reason : string
    amount : number
    dueDate : string
    paid ?: boolean
    
}