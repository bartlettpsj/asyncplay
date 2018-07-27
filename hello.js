// const Random = require('Math').random;
const Promise = require("bluebird");

class AsyncPool {
    constructor(concurrency = 3) {
        this.methods = [];
        this.promises = [];
        this.concurrency = concurrency;
        this.running = 0;
    }

    async runMethod(method) {
        return new Promise((resolve, reject) => {
            const added = this.methods.push(method);

            if (this.running < this.concurrency) {
                this.running++;
                const p = this.methods[added - 1]();
                this.promises.push(p);
                console.log('Got promise', p);
                resolve();
            } else {
                // not ready yet so return a promise
                resolve();
             }
        });

        // waitFor(5000).then(x => {
        //     method();
        // });
    }

    runQueue() {
        this.promises.forEach(method => method());
    }

}

const asyncPool = new AsyncPool();

const addrecord = async (data, timeMs = 1000) => {
    return new Promise((resolve, reject) => { 
        setTimeout(() => { console.log('Timeout:', data); resolve(); }, timeMs);
    })
}

const waitFor = (ms=1000) => new Promise( (resolve, reject) => setTimeout(resolve, ms))

const adds = (new Array(100)).fill('mummy');

// await addrecord(v);
const doWork = async () => {

    Promise.map(adds, (v) => addrecord(v), {concurrency: 10});

    // adds.forEach(async (v) => { 
    //     // asyncPool.runMethod(() => addrecord('Paul'));
    //     const x = await asyncPool.runMethod(  addrecord.bind(this, Math.random(100)) );
        
    //     // await addrecord(v);
    // });    

    // asyncPool.runQueue();
 }

// doWork();

const af = async () => {
    // return;
    // return Promise.resolve(456);
};

const doit = async () => { 
    const x = af();
    console.log(x);
    const c = await x
    console.log(c);
}

doit();