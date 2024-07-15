export interface MuxVideo {
    _id: string;
    _key: string;
    _type: "mux.video";
    asset: {
        playbackId: string;
        data: {
            aspect_ratio: string;
        };
    };
}

export const muxVideoFragment = `
    _id,
    _key,
    _type,
    asset-> {
        playbackId,
        data {
            aspect_ratio
        }
    }
`;
