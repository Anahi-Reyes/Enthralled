const API_KEY = 'c106542d-f06d-4fd6-aa1c-b5d0b56b0108';
const BASE_URL = 'https://api.harvardartmuseums.org/object';

function searchArtworksByAuthor(event) {
    if (event.key === 'Enter') {
        const authorName = document.getElementById('searchAuthor').value;
        const url = `${BASE_URL}?apikey=${API_KEY}&q=person:${authorName}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const results = data.records;
                const resultsContainer = document.getElementById('results');
                resultsContainer.classList.add('column-layout');
                resultsContainer.innerHTML = '';
                if (results.length === 0) {
                    resultsContainer.innerHTML = `<div class="not__found">No works of art by this author were found.</div>
                     <div class="container__img__not__found"><img class="not__found__img" alt="sorry" src="/img/sorry.png"></div>
                    `;
                } else {
                    results.forEach(artwork => {
                        const title = artwork.title;
                        const date = artwork.dated;
                        const imageUrl = artwork.primaryimageurl;

                        const artworkDiv = document.createElement('div');
                        artworkDiv.className = 'artwork__container';
                        artworkDiv.innerHTML = `
                            <div class="container__p"> 
                                <div class="artwork__line">
                                    <br><strong class="artwork__title">Title:</strong> <strong class="artwork__text">${title}</strong><br>
                                    <br><strong class="artwork__title">Date:</strong> <strong class="artwork__text">${date}</strong>
                                </div>
                                <img class="artwork__img" src="${imageUrl}" alt="${title}">
                                <div class="artwork__share-buttons">
                                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}" target="_blank" class="share-button"> <img class="share__icon" alt="Faceook Icon" src="/img/facebook.png"/></a>
                                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=Check out this artwork: ${encodeURIComponent(title)}" target="_blank" class="share-button"> <img class="share__icon" alt="X Icon" src="/img/twitter.png"/> </a>
                                </div>
                            </div>
                        `;

                        const counter = resultsContainer.childElementCount;
                        if (counter % 2 === 0) {
                            artworkDiv.style.backgroundColor = 'rgba(255, 255, 221, 0.97)';
                        } else {
                            artworkDiv.style.backgroundColor = '#ffffff';
                        }

                        resultsContainer.appendChild(artworkDiv);
                    });
                }
            })
            .catch(error => console.error('Request error:', error));
    }
}