"use strict";
function isOnline() {
    const connectionStatus = document.querySelector("div#connectionStatus");
    if (navigator.onLine) {
        connectionStatus.innerText = "Anda sedang Online!";
    }
    else {
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
            navigator.serviceWorker
                .register("./service-worker.js")
                .then((regis) => {
                console.log(regis);
                return navigator.serviceWorker.ready;
            })
                .then((regis2) => {
                const btnSubmit = document.querySelector("button#req-button");
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
    }
    else {
        alert("No service worker support in this browser");
    }
})();
function startSpinLoadingPage() {
    console.log("Mulai blok halaman... Data sedang dimuat");
}
function stopSpinLoadingPage() {
    console.log("Tutup blok halaman... Data sukses dimuat");
}
let networkDataReceived = false;
let sampleUrl = "http://localhost/project-pribadi/sticky-mobile/this_work/php/sample-main.php";
startSpinLoadingPage();
let networkUpdate = fetch(sampleUrl)
    .then((res) => {
    return res.json();
})
    .then((data) => {
    networkDataReceived = true;
    console.log(data);
});
caches
    .match(sampleUrl)
    .then((res) => {
    if (!res) {
        throw Error("No Data!");
    }
    return res.json();
})
    .then((data) => {
    console.log(`Cache data utama ada, isinya: ${JSON.stringify(data)}`);
    if (!networkDataReceived) {
    }
})
    .catch(() => {
    return networkUpdate;
})
    .catch(() => {
    alert("showErrorMessage");
})
    .then(stopSpinLoadingPage);
