export default interface DetailedArtwork {
    data: {
        id: number;
        title: string;
        image_id: string;
        description: string;
        artist_title: string;
        medium_display: string;
        credit_line: string;
        gallery_title: string;
        place_of_origin: string;
        inscriptions: string;
        publication_history: string;
        thumbnail: {
            alt_text: string;
        };
    }
}