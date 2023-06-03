const imageContainer = document.getElementById('image-container');
const form = document.querySelector('form');
const searchedImage = document.getElementById('searchedImage');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const searched = formData.get('searchedImage');

  const api_url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a7cfed2df4af1a130c699d5a1898cdfc&text=${searched}&format=json&nojsoncallback=1`;

  fetch(api_url).then(async (response) => {
    const jsonObject = await response.json();
    const photos = jsonObject.photos.photo;

    const photosArray = [];

    photos.forEach((photo) => {
      const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;

      imageContainer.innerHTML = '';

      const photoImage = document.createElement('img');


      photoImage.src = photoUrl;
      photoImage.style.height = '200px';
      photoImage.style.width = '300px';

     

      photosArray.push(photoImage);

      searchedImage.value = '';
    });

    photosArray.forEach((photo) => {
      imageContainer.append(photo);
    });
  });
});
