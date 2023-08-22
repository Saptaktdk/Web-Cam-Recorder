setTimeout(() => {
    if (db) {

        //? Retrieve videos
        let videoDBTransaction = db.transaction("video", "readonly");
        let videoStore = videoDBTransaction.objectStore("video");
        let videoRequest = videoStore.getAll();
    
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;
            let galleryCont = document.querySelector(".gallery-cont");

            videoResult.forEach((videoObj) => {
                let mediaElem = document.createElement("div");

                mediaElem.setAttribute("class", "media-cont");
                mediaElem.setAttribute("id", videoObj.id);

                let url = URL.createObjectURL(videoObj.blobData);

                mediaElem.innerHTML = `
                <div class="media">
                    <video autoplay loop src="${url}"></video>
                </div>
                <div class="delete action-btn">DELETE</div>
                <div class="download action-btn">DOWNLOAD</div>`;

                galleryCont.appendChild(mediaElem);

                let deleteBtn = document.querySelector(".delete");
                let downloadBtn = document.querySelector(".download");

                //? Delete functionality
                deleteBtn.addEventListener("click", deleteListener)

                //? Download functionality
                downloadBtn.addEventListener("click", downloadListener);

            })
        }

        //? Retrieve images
        let imageDBTransaction = db.transaction("image", "readonly");
        let imageStore = imageDBTransaction.objectStore("image");
        let imageRequest = imageStore.getAll();
    
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;
            let galleryCont = document.querySelector(".gallery-cont");

            imageResult.forEach((imageObj) => {
                let mediaElem = document.createElement("div");

                mediaElem.setAttribute("class", "media-cont");
                mediaElem.setAttribute("id", imageObj.id);

                let url = imageObj.url;

                mediaElem.innerHTML = `
                <div class="media">
                    <img src="${url}" />
                </div>
                <div class="delete action-btn">DELETE</div>
                <div class="download action-btn">DOWNLOAD</div>`;

                galleryCont.appendChild(mediaElem);

                let deleteBtn = document.querySelector(".delete");
                let downloadBtn = document.querySelector(".download");

                //? Delete functionality
                deleteBtn.addEventListener("click", deleteListener)

                //? Download functionality
                downloadBtn.addEventListener("click", downloadListener);

            })
        }

    }
}, 100);

// TODO: Delete button implementation ( Removal from both UI and DB )
function deleteListener(e) {

    //? DB Removal
    let id = e.target.parentElement.getAttribute("id");
    let type = id.slice(0,3);

    if (type === "vid") {
        let videoDBTransaction = db.transaction("video", "readwrite");
        let videoStore = videoDBTransaction.objectStore("video");
        videoStore.delete(id);
    }
    else if (type === "img") {
        let imageDBTransaction = db.transaction("image", "readwrite");
        let imageStore = imageDBTransaction.objectStore("image");
        imageStore.delete(id);
    }

    //? UI Removal
    setTimeout(() => {
        e.target.parentElement.remove();     
    }, 100);

    window.location.reload();
   
}

// TODO: Download Button Implementation ( Removal from both UI and DB )
function downloadListener(e) {

    let id = e.target.parentElement.getAttribute("id");
    let type = id.slice(0,3);

    if (type === "vid") {
        let videoDBTransaction = db.transaction("video", "readwrite");
        let videoStore = videoDBTransaction.objectStore("video");
        let videoRequest = videoStore.get(id);

        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;
            let videoUrl = URL.createObjectURL(videoResult.blobData);
            let a = document.createElement("a");

            a.href = videoUrl;
            a.download = "stream.mp4";
            a.click();
        }

    }
    else if (type === "img") {
        let imageDBTransaction = db.transaction("image", "readwrite");
        let imageStore = imageDBTransaction.objectStore("image");
        let imageRequest = imageStore.get(id);

        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;
            let a = document.createElement("a");

            a.href = imageResult.url;
            a.download = "image.jpg";
            a.click();
        }

    }

    window.location.reload();

}
