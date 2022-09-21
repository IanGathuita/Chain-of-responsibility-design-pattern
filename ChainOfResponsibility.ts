/*creates a chain of receiver objects for a given request. Each receiver contains a reference to the next
receiver.First receiver handles a request. If further processing is needed then it will send the request to
the next receiver. If no further processing is needed, it ends the request */
//like Express middleware

abstract class Handler{
    nextHandler!: Handler;
    setNext(nextHandler:Handler){
        this.nextHandler = nextHandler;
    }
    abstract dispatch(requestedAmount:number):void;
}

class OneThousandHandler extends Handler{

    dispatch(requestedAmount: number): void {
        let numberOfNotes = Math.trunc(requestedAmount / 1000);
        if(numberOfNotes > 0){
            console.log('No of 1000 notes dispatched by ATM are ',numberOfNotes);
        }
        let pendingAmountToBeProcessed:number = requestedAmount >= 1000 ? requestedAmount - (numberOfNotes * 1000) : requestedAmount;
        if (pendingAmountToBeProcessed > 0)
        {
            this.nextHandler.dispatch(pendingAmountToBeProcessed);
        }
    }
    
}

class FiveHundredHandler extends Handler{

    dispatch(requestedAmount: number): void {
        let numberOfNotes = Math.trunc(requestedAmount / 500);
        if(numberOfNotes > 0){
            console.log('No of 500 notes dispatched by ATM are ',numberOfNotes);
        }
        let pendingAmountToBeProcessed:number = requestedAmount >= 500 ? requestedAmount - (numberOfNotes * 500):requestedAmount;
        if (pendingAmountToBeProcessed > 0)
        {
            this.nextHandler.dispatch(pendingAmountToBeProcessed);
        }
    }
    
}

class TwoHundredHandler extends Handler{

    dispatch(requestedAmount: number): void {
        let numberOfNotes = Math.trunc(requestedAmount / 200);
        if(numberOfNotes > 0){
            console.log('No of 200 notes dispatched by ATM are ',numberOfNotes);
        }
        let pendingAmountToBeProcessed:number = requestedAmount >= 200 ? requestedAmount - (numberOfNotes * 200) :requestedAmount;
        if (pendingAmountToBeProcessed > 0)
        {
            this.nextHandler.dispatch(pendingAmountToBeProcessed);
        }
    }
    
}

class HundredHandler extends Handler{

    dispatch(requestedAmount: number): void {
        let numberOfNotes = Math.trunc(requestedAmount / 100);
        if(numberOfNotes > 0){
            console.log('No of 100 notes dispatched by ATM are ',numberOfNotes);
        }
        let pendingAmountToBeProcessed:number = requestedAmount >= 100 ? requestedAmount - (numberOfNotes * 100) : requestedAmount;
        if (pendingAmountToBeProcessed > 0)
        {
            this.nextHandler.dispatch(pendingAmountToBeProcessed);
        }
    }
    
}

class ShillingHandler extends Handler{

    dispatch(requestedAmount: number): void {
        let numberOfNotes = requestedAmount / 1;
        if(numberOfNotes > 0){
            console.log('No of 1 shilling coins dispatched by ATM are ',numberOfNotes);
        }
    }
    
}

//chaining handlers
class ATM{
    oneThousandHandler:Handler = new OneThousandHandler();
    fiveHundredHandler:Handler = new FiveHundredHandler();
    twoHundredHandler:Handler = new TwoHundredHandler();
    hundredHandler :Handler = new HundredHandler();
    shillingHandler = new ShillingHandler();

    constructor(){
        this.oneThousandHandler.setNext(this.fiveHundredHandler);
        this.fiveHundredHandler.setNext(this.twoHundredHandler);
        this.twoHundredHandler.setNext(this.hundredHandler);
        this.hundredHandler.setNext(this.shillingHandler);
    }

    withdraw(amount:number){
        this.oneThousandHandler.dispatch(amount);
    }
}

//client
const atm = new ATM();
atm.withdraw(4632);