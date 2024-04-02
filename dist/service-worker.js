"use strict";
const nameCached = "contoh-saja";
/*
// Cached - On Service Worker Install
self.addEventListener("install", function (event) {
    // Apabila menggunakan skipWaiting(), maka service worker akan diperbarui saat itu juga tanpa harus menunggu yang originalnya terhapus
    self.skipWaiting();
    event.waitUntil(caches.open("cacheName-1").then((cache) => {
        return cache.addAll([
            "./src/assets/style.css",
            "./offline.html"
        ]);
    }));
});
*/

// Cached - On User Interaction
self.addEventListener("install", function (event) {
    self.skipWaiting();
    // Lebih baiknya Assets utama (Js, Css, dll) dijadikan Cache saat install pertama
    // Sisanya bisa tambah cache di luar service worker
    // caches.open(nameCached).then((cache) => {
    //     cache.addAll([
    //       "./offline.html",
    //       "./src/assets/style.css",
    //       "./src/index.js"
    //     ]);
    // });
});
self.addEventListener("activate", function (event) {
    // Menghapus cache yang kadaluarsa
    event.waitUntil(
        caches.keys()
            .then((cacheName) => {
                return Promise.all(
                    cacheName.filter((cacheName2) => {
                        // return true jika akan hapus cache ini,
                        // Hati-hati, caches ada shared across origin
                        console.log("Daftar cache...", cacheName2);
                    }).map((cacheName3) => {
                        console.log("Map dari filter cache...", cacheName3);
                        return caches.delete(cacheName3)
                    })
                )
            })
    )
});
self.addEventListener("sync", function(event) {
    console.log("Firing: Sync");
    if (event.tag === "image-fetch") {
        console.log("Sync event fired");
        event.waitUntil(fetchImage());
    }
})
/*
async function cacheOnly(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        console.log("Found response in cache: ", cachedResponse);
        return cachedResponse;
    } else {
        // return Response.error();
        return fetch(request);
    }
}
self.addEventListener("fetch", (event) => {
    console.log(event);
    event.respondWith(cacheOnly(event.request));
});
*/

// Cached - Cache Then Network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(nameCached)
            .then(async (cache) => {
                const res = await fetch(event.request);
                cache.put(event.request, res.clone());
                return res;
            })
    );
});

function fetchImage() {
    console.log("Firing: doSomeStuff()");
    fetch("http://localhost/project-pribadi/sticky-mobile/this_work/dist/src/assets/images/aqua.png")
        .then((res) => {
            return res;
        })
        .then((text) => {
            console.log("Request successful", text);
        })
        .catch((err) => {
            console.log("Request failed", err);
        })
}
