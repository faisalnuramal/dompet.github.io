/*
// Cara kerja Promise ke-1, resolve atau reject
interface myX {
  data: boolean;
  msg: string;
}
function myAsyncFn() {
  const everythinkWentWell: boolean = true;
  const mypromise: Promise<myX> = new Promise((resolve, reject) => {
    if (everythinkWentWell) {
      resolve({ data: everythinkWentWell, msg: "Data berhasil terambil" });
    } else {
      reject({ data: everythinkWentWell, msg: "Things did not go well" });
    }
  });
  return mypromise;
}

function init() {
  myAsyncFn()
    .then((response) => {
      alert(response.msg);
    })
    .catch((err) => {
      alert(err);
    });
}
init();
*/

/*
// Cara kerja Promise ke-2, Fulfilled
let promiseCount: number = 0;
let log = document.getElementById("log")! as HTMLDivElement;
function testPromise() {
  let thisPromiseCount: number = ++promiseCount;
  log.insertAdjacentHTML(
    "beforeend",
    `${thisPromiseCount} - Promise started: Sync code started<br>`
  );
  const p1 = new Promise<number>((resolve) => {
    log.insertAdjacentHTML(
      "beforeend",
      `${thisPromiseCount} - Promise started: Async code started<br>`
    );
    // create Asynchronism
    window.setTimeout((): void => {
      // fulfill promise
      resolve(thisPromiseCount);
    }, Math.random() * 2000 + 1000);
  });
  p1.then((val) => {
    log.insertAdjacentHTML(
      "beforeend",
      `${val} - Promise fulfilled: Async code terminated<br>`
    );
  }).catch((reason) => {
    alert(`Handle rejected promise (${reason}) here`);
  });
  log.insertAdjacentHTML(
    "beforeend",
    `${thisPromiseCount} - Promise made: Sync code terminated<br>`
  );
}
if ("Promise" in window) {
  let btn = document.getElementById("mybtn")! as HTMLButtonElement;
  btn.addEventListener("click", testPromise);
} else {
  log.innerHTML = "Your browser not support Promise";
}
*/

/*
// Cara kerja Fetch API ke-1
interface myX2 {
  data: string | null;
}
(() => {
  fetch("http://localhost/info.php")
    .then<myX2>((response) => {
      if (response.status === 200) {
        return { data: "mydata" };
      } else {
        return { data: null };
      }
    })
    .then((response): void => {
      alert(response["data"]);
    })
})();
*/

/*
// Cara kerja Fetch API ke-2, dengan ajax
type myX3 = Array<{ name: string }>;
function ajaxCall(url: string) {
  return new Promise<myX3>((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function () {
      if (req.status === 200) {
        resolve(JSON.parse(req.response));
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function () {
      reject(Error("Network error"));
    };
    req.send();
  });
}
ajaxCall("http://localhost/project-pribadi/sticky-mobile/this_work/php/sample-json.php").then((response) => {
  if (response.length > 0) {
    let joinName: Array<string> = [];
    response.forEach((el) => {
      joinName.push(el["name"]);
    });
    console.log(joinName.join(", "));
  } else {
    console.log("No data!");
  }
});
// versi fetch API nya
fetch("http://localhost/project-pribadi/sticky-mobile/this_work/php/sample-json.php")
  .then((x) => {
    return x.json();
  })
  .then((y) => {
    console.log(y);
  });
*/

/*
// Cara kerja Fetch API ke-3, dengan mengirim body atau formData
fetch(
  "http://localhost/project-pribadi/sticky-mobile/this_work/php/sample-post.php",
  {
    method: "post",
    headers: new Headers({
      // "Content-Type": "application/x-www-form-urlencode",
      "Content-Type": "application/json",
    }),
    // body: new FormData(document.getElementById("myform")! as HTMLFormElement),
    body: `["satu", "dua", "tiga"]`,
  }
)
  .then((response) => {
    return response.json();
  })
  .then((parse) => {
    console.log(parse);
  });
*/

function isOnline() {
  const connectionStatus = document.querySelector(
    "div#connectionStatus"
  )! as HTMLDivElement;
  if (navigator.onLine) {
    connectionStatus.innerText = "Anda sedang Online!";
  } else {
    connectionStatus.innerText =
      "Saat ini anda sedang Offline, Request anda masuk antrian dan akan sinkron segera setelah anda Online";
  }
}

(() => {
  window.addEventListener("online", isOnline);
  window.addEventListener("offline", isOnline);
  isOnline();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      // Karena dilihat dari posisi index.html (pemanggilan service workernya),
      // maka posisi yang benarnya itu ada di ./service-worker.js
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((regis) => {
          console.log(regis);
          return navigator.serviceWorker.ready;
        })
        .then((regis2: any) => {
          // Register event sync
          const btnSubmit = document.querySelector(
            "button#req-button"
          )! as HTMLButtonElement;
          btnSubmit.addEventListener("click", () => {
            regis2.sync
              .register("image-fetch")
              .then(() => {
                console.log("Sync registered!");
              })
              .catch(() => {
                console.log("unable to fetch image!");
              });
          });
        })
        .catch(() => {
          console.log("Unable to register service worker!");
        });
    });
  } else {
    alert("No service worker support in this browser");
  }
})();

/*
const btnSave2Cache = document.querySelector(
  "#save-to-cache"
)! as HTMLButtonElement;
const divContent = document.querySelector(
  "div#exam-content"
)! as HTMLDivElement;

// Tampilkan data dari server
fetch(
  "http://localhost/project-pribadi/sticky-mobile/this_work/php/sample-json.php",
  {
    method: "get",
    headers: new Headers({
      // "Content-Type": "application/x-www-form-urlencode",
      Accept: "application/json",
    }),
  }
)
  .then((response) => {
    return response.json();
  })
  .then((parse: Array<{ name: string }>) => {
    divContent.innerText = JSON.stringify(parse);
  });

btnSave2Cache.addEventListener("click", (ev) => {
  ev.preventDefault();
  // const id = btnSave2Cache.dataset.id;
  caches.open(`contoh-saja`).then((cache) => {
    cache.add(
      "http://localhost/project-pribadi/sticky-mobile/this_work/php/sample-json.php"
    );
  });
});
*/

// Cached - Cache Then Network
function startSpinLoadingPage(): void {
  console.log("Mulai blok halaman... Data sedang dimuat");
}
function stopSpinLoadingPage(): void {
  console.log("Tutup blok halaman... Data sukses dimuat");
}
let networkDataReceived = false;
let sampleUrl =
  "http://localhost/project-pribadi/sticky-mobile/this_work/php/sample-main.php";
startSpinLoadingPage();

// Ambil fresh data
let networkUpdate = fetch(sampleUrl)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    networkDataReceived = true;
    // lakukan perubahan data ke halaman
    // updatePage(data);
    console.log(data);
  });

// Ambil cache data
caches
  .match(sampleUrl)
  .then((res) => {
    if (!res) {
      throw Error("No Data!");
    }
    return res.json();
  })
  .then((data) => {
    // Jangan overwrite data terbaru dari network
    console.log(`Cache data utama ada, isinya: ${JSON.stringify(data)}`);
    if (!networkDataReceived) {
      // lakukan perubahan data ke halaman
      // updatePage(data);
    }
  })
  .catch(() => {
    // Data tidak ada dicache, ambil dari network
    return networkUpdate;
  })
  .catch(() => {
    alert("showErrorMessage");
  })
  .then(stopSpinLoadingPage);

/**
 * @description Mengenai pengenalan Fetch API (Hal.39) di buku PWA
 */
