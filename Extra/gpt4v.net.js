function newGUID() {
    return URL.createObjectURL(new Blob).match(/[a-z0-9-]+$/)?.[0];
}

fetch("https://gpt4vnet.erweima.ai/api/v1/chat/gpt4o/chat", {
    method: "POST",
    headers: {
        "content-type": "application/json",
        "uniqueid": newGUID(),
    },
    body: JSON.stringify({
        prompt: "What is this?",
        sessionId: newGUID(),
        attachments: [
            {
                fileType: "image/png",
                fileContent: `https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/7/b/3/b/7b3b85029226f9eda1fd3b2df648280de9cb1e97.png`,
            }
        ]
    })
}).then(response => response.text()).then(console.log);