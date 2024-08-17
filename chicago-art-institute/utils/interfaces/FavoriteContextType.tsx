import Artwork from "./Artwork";

export default interface FavoriteContextType {
    favorites: Map<number, Artwork>;
    addFavorite: (item: Artwork) => void;
    removeFavorite: (id: number) => void;
    loadFavorites: () => void;
};