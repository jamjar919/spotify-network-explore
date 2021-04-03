
// Global audio element
let audio: HTMLAudioElement = new Audio();

/**
 * This hook lets you use a single global audio element, ensuring that multiple songs do not play at the same time. The
 * src is passed through to the onPlay and onPause callbacks to allow the state to be accurately updated.
 *
 * @param onPlay    Triggered every time the element is played
 * @param onPause   Triggered every time the element is paused
 */
export const useAudio = (
    onPlay?: (src: string) => void,
    onPause?: (src: string) => void
) => {

    // Handle pause/play when audio is initialised
    const play = (url: string) => {
        audio.pause();
        audio.src = url;

        audio.addEventListener("play", () => {
            if (onPlay) {
                onPlay(audio.src);
            }
        });
        audio.addEventListener("pause", () => {
            if (onPause) {
                onPause(audio.src);
            }
        });
        audio.addEventListener("canplaythrough", () => {
            audio.play();
        });
        audio.addEventListener("ended", () => {
            audio.currentTime = 0;
            audio.pause();
        });
    };

    const pause = () => audio.pause();

    return { play, pause };
};