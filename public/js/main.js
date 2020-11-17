const selectDog = document.querySelector('.select-dog');
selectDog.addEventListener('change', (event) => {
  document.location.replace(`/dogs/breed/${event.target.value}`);
});
