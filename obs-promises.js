const { Observable, observable, filter } = require('rxjs');


const doSomething = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('valor 3');
    }, 3000);
  });
}
const doSomething$ = () => {
  return new Observable(observable => {
    observable.next('valor$ 1');
    observable.next('valor$ 1');
    observable.next(null);
    setTimeout(() => {
      observable.next('valor$ 1');
    }, 5000);
    setTimeout(() => {
      observable.next(null);
    }, 8000);
  });
}

(async () => {
  const rta = await doSomething();
  console.log(rta);
})();

(() => {
  const obs$ = doSomething$();
  obs$
  .pipe(
    filter(value => value !== null)
  )
  .subscribe(rta => {
    console.log(rta);
  })
})();
