const LOCAL_STORAGE_KEY = 'favourites';

export const getFavourites = (): number[] => {
  const favourites = localStorage.getItem(LOCAL_STORAGE_KEY);
  return favourites ? JSON.parse(favourites) : [];
};

export const addFavourite = (bikeId: number) => {
  const favourites = getFavourites();
  if (!favourites.includes(bikeId)) {
    favourites.push(bikeId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favourites));
  }
};

export const removeFavourite = (bikeId: number) => {
  const favourites = getFavourites().filter(id => id !== bikeId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favourites));
};

export const isFavourite = (bikeId: number): boolean => {
  return getFavourites().includes(bikeId);
};