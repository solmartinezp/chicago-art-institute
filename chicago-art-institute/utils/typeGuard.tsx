import Artwork from './interfaces/Artwork';
import DetailedArtwork from './interfaces/DetailedArtwork';

export function isArtwork(item: Artwork | DetailedArtwork): item is Artwork {
  return (item as Artwork).short_description !== undefined;
}