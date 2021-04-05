declare const sigma: Sigma;

;(function() {
    'use strict';

    if (typeof sigma === 'undefined')
        throw 'sigma is not declared';

    // Initialize packages:
    sigma.utils.pkg('sigma.canvas.labels');

    /**
     * Custom renderer that always draws the label for a node using the node colour
     */
    sigma.canvas.labels.selected = function(node: SigmaNode, context: CanvasRenderingContext2D, settings: any) {
        let x,
            y,
            w,
            h,
            e,
            fontStyle = settings('hoverFontStyle') || settings('fontStyle'),
            prefix = settings('prefix') || '',
            size = node[prefix + 'size'],
            fontSize = (settings('labelSize') === 'fixed') ?
                settings('defaultLabelSize') :
                settings('labelSizeRatio') * size;

        // Label background:
        context.font = (fontStyle ? fontStyle + ' ' : '') +
            fontSize + 'px ' + (settings('hoverFont') || settings('font'));

        context.beginPath();
        context.fillStyle = node.color || settings('defaultNodeColor');

        if (node.label && typeof node.label === 'string') {
            x = Math.round(node[prefix + 'x'] - fontSize / 2 - 2);
            y = Math.round(node[prefix + 'y'] - fontSize / 2 - 2);
            w = Math.round(
                context.measureText(node.label).width + fontSize / 2 + size + 7
            );
            h = Math.round(fontSize + 4);
            e = Math.round(fontSize / 2 + 2);

            context.moveTo(x, y + e);
            context.arcTo(x, y, x + e, y, e);
            context.lineTo(x + w, y);
            context.lineTo(x + w, y + h);
            context.lineTo(x + e, y + h);
            context.arcTo(x, y + h, x, y + h - e, e);
            context.lineTo(x, y + e);

            context.closePath();
            context.fill();

            context.fillStyle = settings('defaultLabelHoverColor');

            context.fillText(
                node.label,
                Math.round(node[prefix + 'x'] + size + 3),
                Math.round(node[prefix + 'y'] + fontSize / 3)
            );
        }

    };
}).call(this);
