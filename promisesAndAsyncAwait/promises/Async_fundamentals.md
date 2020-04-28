# Promise Basics
    * Promise => assurance of work that could be completed in future
    * Promise could either be resolved or rejected once in a lifetime.
    * Promise => states
                    1. Initial => Pending [*]
                    2. Final => Resolved,Reject [*]
                    if you call resolve => final => promise will resolve with value passed in resolve fn.
                    if you reject => final => promise will reject with value passed in reject fn [*]
    * To consume a promise we have two ** Synchronous functions** then/catch. They are used to register/ attach cb fn to that promise 
    * cb of any promise will only execute when promise received from it get into it's final state , i.e [resolved or rejcted]
    * cb fn passed through then and catch are async.
    * then and catch also returns a promise .
    * final state of a promise returned from then/catch depends upon the value returned there from cb => scb,fcb 
                if cb returns then your promise will resolve into,
                                val => val
                                nothing => undefined
                                promise => promise 
                                err 
                                    fcb => will call fcb and err as it's message
                                    err => propogate
    * then have two callback => scb, fcb (fcb is optional).
    * catch => catch(fcb) => then(undefined,fcb)

