// script.js

document.addEventListener("DOMContentLoaded", async () => {
    const generatedTextDiv = document.getElementById("generatedText");

    try {
        const app = await gradio.client("jacquelinegrimm/mistralai-Mistral-7B-v0.1");
        const result = await app.predict("/predict", [
            "The universe (which others call the Library) is composed of an indefinite and perhaps infinite number of hexagonal galleries, with vast air shafts between, surrounded by very low railings.",
        ]);

        generatedTextDiv.innerHTML = result.data;
    } catch (error) {
        console.error("Error:", error);
        generatedTextDiv.innerHTML = "An error occurred while generating the text.";
    }
});
