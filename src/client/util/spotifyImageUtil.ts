import ImageObject = SpotifyApi.ImageObject;

export const getImageFromSpotifyArray = (images: ImageObject[]) => {
    if (images[0]) {
        const biggestImage = images[0];
        return {
            size: 20,
            url: biggestImage.url,
            scale: 2,
            clip: 2,
            w: biggestImage.width,
            h: biggestImage.height
        };
    }
    return undefined;
};