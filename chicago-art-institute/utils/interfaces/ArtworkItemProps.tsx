import Artwork from "./Artwork";

export default interface ArtworkItemProps {
    item: Artwork;
    isFavorite: boolean;
    onImageLoad: (id: number) => void;
    loadedImages: { [key: string]: boolean };
    detailed?: boolean;
}