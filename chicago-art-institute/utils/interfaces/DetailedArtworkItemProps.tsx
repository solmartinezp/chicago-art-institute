import DetailedArtwork from "./DetailedArtwork";

export default interface DetailedArtworkItemProps {
    item: DetailedArtwork;
    isFavorite: boolean;
    onImageLoad: (id: number) => void;
    loadedImages: { [key: string]: boolean };
}