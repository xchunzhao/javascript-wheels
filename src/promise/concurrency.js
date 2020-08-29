const concurrencyPromise = (requests, limit) => {
  const results = [];
  const totalRequests = [...requests];
  let resolveCount = 0;

  const handlePromise = promise => {
    return new Promise((resolve, reject) => {
      promise.then(res => resolve(res)).catch(e => reject(e));
    });
  };

  return new Promise(resolve => {
    // 模拟开启limit个线程
    for (let i = 1; i <= limit; i++) {
      invokeThread();
    }

    function invokeThread() {
      if (!totalRequests.length) return;
      const current = totalRequests.shift();
      handlePromise(current)
        .then(res => results.push(res))
        .finally(() => {
          resolveCount += 1;
          if (resolveCount === requests.length) {
            resolve(results);
          }
          // promise done之后 获取新的promise执行
          invokeThread();
        });
    }
  });
};

const reqs = Array.from(
  { length: 5 },
  (_, index) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(index);
      }, 1000);
    })
);

concurrency(reqs, 3).then(res => console.log(res));
