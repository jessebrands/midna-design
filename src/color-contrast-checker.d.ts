declare module "color-contrast-checker" {
    export default class ColorContrastChecker {
        isLevelAA: (a: string, b: string, fontSize: number) => boolean;
    }
}
