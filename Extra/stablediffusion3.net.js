let apiUrl = "https://stablediffusion3net.erweima.ai"

async function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function newGUID() {
    return URL.createObjectURL(new Blob).match(/[a-z0-9-]+$/)?.[0];
}

let GUID = newGUID();

fetch(apiUrl + "/api/v1/generate/create", {
    method: "POST",
    headers: {
        "content-type": "application/json",
        "uniqueid": GUID
    },
    body: JSON.stringify({
        prompt: "big balls",
        negativePrompt: "",
        model: "flux",
        size: "1:1",
        batchSize: "1",
        imageUrl: "",
        rangeValue: null
    })
})
    .then(response => response.json())
    .then(async json => {
        const UUID = json?.data.recordUuid;

        while (UUID) {
            const imageInfo = await fetch(apiUrl + "/api/v1/generate/record-detail?recordUuid=" + UUID, {
                headers: {
                    uniqueid: GUID
                }
            })
                .then(response => response.json())
                .then(json => JSON.parse(json?.data.picUrl || null)?.[0]);
            console.log("next check");

            if (imageInfo) {
                console.log(imageInfo.picUrl);
                break;
            }

            await sleep(1000);
        }

    })