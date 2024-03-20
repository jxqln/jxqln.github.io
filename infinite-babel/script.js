// script.js

(async () => {
    const generatedTextDiv = document.getElementById("generatedText");

    try {
        const app = await gradio.client("jacquelinegrimm/mistralai-Mistral-7B-v0.1");
        const result = await app.predict("/predict", [
            "Hello!!",
        ]);

        generatedTextDiv.innerHTML = result.data;
        console.log(result.data);
    } catch (error) {
        console.error("Error:", error);
        generatedTextDiv.innerHTML = "An error occurred.";
    }
})();
