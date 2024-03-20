// script.js

const beginLink = document.getElementById("beginLink");
const generatedTextDiv = document.getElementById("generatedText");

beginLink.addEventListener("click", async () => {
    const app = await client("jacquelinegrimm/mistralai-Mistral-7B-v0.1");
    const result = await app.predict("/predict", [
        "The universe (which others call the Library) is composed of an indefinite and perhaps infinite number of hexagonal galleries, with vast air shafts between, surrounded by very low railings.",
    ]);

    generatedTextDiv.innerHTML = result.data;
});
