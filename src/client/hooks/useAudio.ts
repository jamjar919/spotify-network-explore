
// Global audio element
let audio: HTMLAudioElement = new Audio();

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