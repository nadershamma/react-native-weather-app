import {IMAGE_API_KEY} from "../../.secrets/keys";

const IMAGE_API_STEM = 'https://pixabay.com/api/?key=';
const IMAGE_URI_SUFFIX = '&image_type=photo&safesearch=true';

function randomInt(total) {
    return Math.floor(Math.random() * Math.floor(total));
}
function imageUri(description) {
    let query;
    if (description.includes(' ')){
       query = description.split(' ').join('+');
    }
    else{
        query = description;
    }
    return `${IMAGE_API_STEM}${IMAGE_API_KEY}&q=${query}${IMAGE_URI_SUFFIX}`;
}

function fetchImage(description) {
    return fetch(imageUri(description))
        .then(response => response.json())
        .then(responseJSON => {
            if (0 < responseJSON.totalHits) {
                return responseJSON.hits;
            } else {
                return ['https://pixabay.com/get/eb33b80a2df2083ed1584d05fb1d4396e673e3dc18ac104490f1c17da3ecb1b8_640.jpg'];

            }
        })
        .catch(error => {
            console.error(error);
        })
}

export {fetchImage, randomInt};