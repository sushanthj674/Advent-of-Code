class myPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.callbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.callbacks.forEach((cb) => cb.onFulfilled(value));
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.value = reason;
        this.callbacks.forEach((cb) => cb.onRejected(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new myPromise((resolve, reject) => {
      const handleCallback = () => {
        try {
          if (this.state === "fulfilled") {
            const result = onFulfilled ? onFulfilled(this.value) : this.value;
            resolve(result);
          } else if (this.state === "rejected") {
            const result = onRejected ? onRejected(this.value) : this.value;
            reject(result);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === "pending") {
        this.callbacks.push({
          onFulfilled: () => handleCallback(),
          onRejected: () => handleCallback()
        });
      } else {
        handleCallback();
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new myPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new myPromise((_, reject) => reject(reason));
  }
}

// // // Example Usage
// // const asyncTask = new Smilr((resolve, reject) => {
// //   setTimeout(() => resolve("Task completed!"), 1000);
// // });

// // asyncTask.then(console.log).catch(console.error);

// // const p = new Promise(() => {});

// // console.log(p);

// // const r = Deno.readTextFile("./promise.js").then(console.log);
// // console.log(r);

// const obj = promise.then((v) => {
//   return new Promise((res) => res(v));
// });

// console.log(obj);

// setTimeout(() => {
//   console.log(obj);
// }, 0);
const promise = new Promise((res) => {
  res("promise resolved");
});

promise.then((r) => {
  console.log("in first then");
  return r;
}).then((a) => {
  console.log("in second then");
  return new Promise((res) => res(a));
});

promise.then((r) => {
  console.log("in first  first then");
  return r;
}).then((a) => {
  console.log("in second second then");
  return a;
});

// first then - f f then- s then-

promise.then(() => {
  throw "error";
}).catch((e) => e);
// const a = Promise.reject("ello").then(_, () => {
//   console.log("first then");
// }).then(() => console.log("second then"))
//   .finally(() => {
//     console.log("hello im finnaly one ");
//     return "im val";
//   });

const pro = new Promise((r) => r());
const a = pro.finally(() => "new value"); // This value is ignored

const b = pro.finally(() => "new value");

const c = Promise.all([
  Promise.resolve('xivhsfvisfib'),
  new Promise((re,f) => {
    setTimeout(() => {
      console.log("sec");
      re('2');
    }, 10000);
  }),
  new Promise((re,f) => {
    setTimeout(() => {
      console.log("thir");
      re('3');
    }, 5000);
  }),
]).then((val) => {
  console.log('resolved', val);
},(val) => {
  console.log('rejected', val);
}
);
