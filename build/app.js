"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = "9db1a2a1e3mshaa3962f28e449f7p1ed127jsnf66c08e85dd6";
const apiUrl = "https://text-translator2.p.rapidapi.com/getLanguages";
const apiHost = "text-translator2.p.rapidapi.com";
const apiPostHostUrl = "https://text-translator2.p.rapidapi.com/translate";
const resultText = document.getElementById("result");
const translateForm = document.getElementById("translate");
// const textToConvert = translateForm.elements.namedItem(
//   "textToConvert"
// ) as HTMLInputElement;
const dropdownMenu = translateForm.elements.namedItem("languagues");
const headers = {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": apiHost,
};
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(apiUrl, { method: "GET", headers });
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = yield response.json();
        const languages = data.data.languages;
        if (languages) {
            languages.forEach((language) => {
                const option = document.createElement("option");
                option.value = language.code;
                option.textContent = language.name;
                dropdownMenu.appendChild(option);
            });
        }
    }
    catch (error) {
        console.error(error.message);
        document.write(error.message);
    }
});
fetchData();
const translateText = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const selectedLanguage = dropdownMenu.value;
    const textValue = "Good Morning";
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", "auto");
    encodedParams.set("target_language", selectedLanguage);
    encodedParams.set("text", textValue);
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": apiHost,
        },
        body: encodedParams.toString(),
    };
    try {
        const response = yield fetch(apiPostHostUrl, requestOptions);
        if (!response.ok) {
            document.write("Network Error. Please try again!");
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = yield response.json();
        const result = data.data.translatedText;
        resultText.classList.add("outgoing");
        setTimeout(() => {
            resultText.textContent = result;
            resultText.classList.remove("outgoing");
            resultText.classList.add("incoming");
            setTimeout(() => {
                resultText.classList.remove("incoming");
            }, 1000);
        }, 1000);
    }
    catch (error) {
        console.error(error);
        document.write(error.message);
    }
});
