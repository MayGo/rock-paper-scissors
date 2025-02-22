export const getQuadraticBezierPoint = (
    from: { x: number; y: number },
    control: { x: number; y: number },
    to: { x: number; y: number },
    progress: number
) => {
    const u = 1 - progress;
    return {
        x: u * u * from.x + 2 * u * progress * control.x + progress * progress * to.x,
        y: u * u * from.y + 2 * u * progress * control.y + progress * progress * to.y
    };
};
