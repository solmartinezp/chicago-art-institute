export default interface Artwork {
    id: number;
    title: string;
    image_id: string;
    description: string;
    short_description?: string;
    provenance_text?: string;
}