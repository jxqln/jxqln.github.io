// script.js

(async () => {
    const generatedTextDiv = document.getElementById("generatedText");

    try {
        const response = await fetch("https://jacquelinegrimm-mistralai-mistral-7b-v01.hf.space/run/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: ["Hello!!"]
            })
        });

        const result = await response.json();
        generatedTextDiv.innerHTML = result.data[0];
        console.log(result.data[0]);
    } catch (error) {
        console.error("Error:", error);
        generatedTextDiv.innerHTML = "An error occurred while generating the text.";
    }
})();
