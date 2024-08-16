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
        info: {
            license_text: string;
            version: string;
        };
        thumbnail: {
            alt_text: string;
        };
        place_of_origin: string;
    }
}