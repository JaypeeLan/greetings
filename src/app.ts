const apiKey = "9db1a2a1e3mshaa3962f28e449f7p1ed127jsnf66c08e85dd6";
const apiUrl = "https://text-translator2.p.rapidapi.com/getLanguages";
const apiHost = "text-translator2.p.rapidapi.com";
const apiPostHostUrl = "https://text-translator2.p.rapidapi.com/translate";

const resultText = document.getElementById("result");
const translateForm = document.getElementById("translate") as HTMLFormElement;
// const textToConvert = translateForm.elements.namedItem(
//   "textToConvert"
// ) as HTMLInputElement;
const dropdownMenu = translateForm.elements.namedItem(
  "languagues"
) as HTMLSelectElement;

interface Language {
  code: string;
  name: string;
}

const headers = {
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": apiHost,
};

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl, { method: "GET", headers });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    const languages: Language[] = data.data.languages;

    if (languages) {
      languages.forEach((language) => {
        const option = document.createElement("option");

        option.value = language.code;
        option.textContent = language.name;

        dropdownMenu.appendChild(option);
      });
    }
  } catch (error: any) {
    console.error(error.message);
    document.write(error.message);
  }
};

fetchData();

const translateText = async (event: Event) => {
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
    const response = await fetch(apiPostHostUrl, requestOptions);

    if (!response.ok) {
      document.write("Network Error. Please try again!");
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const result = data.data.translatedText;

    resultText!.classList.add("outgoing");

    setTimeout(() => {
      resultText!.textContent = result;

      resultText!.classList.remove("outgoing");
      resultText!.classList.add("incoming");

      setTimeout(() => {
        resultText!.classList.remove("incoming");
      }, 1000);
    }, 1000);
  } catch (error: any) {
    console.error(error);
    document.write(error.message);
  }
};
