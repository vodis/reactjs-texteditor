export const setStart = () => {
    const { anchorNode, anchorOffset } = document.getSelection();

    const range = document.createRange();
    range.setStart(anchorNode, anchorOffset);

    return {
        node: anchorNode && anchorNode.data,
        offset: anchorOffset,
        range,
    }
}

export const captureSelection = (innerHtml) => {
    const {anchorNode, anchorOffset, focusNode, focusOffset} = document.getSelection();

    if (anchorNode === focusNode && anchorOffset === focusOffset) {
        return {};
    }

    const indexAnchorNode = innerHtml.indexOf(anchorNode.data) + anchorOffset;
    const indexFocusNode = innerHtml.indexOf(focusNode.data) + focusOffset;
    const isDirectedForward = indexAnchorNode < indexFocusNode;

    let extractedValue = isDirectedForward 
        ? innerHtml.slice(indexAnchorNode, indexFocusNode)
        : innerHtml.slice(indexFocusNode, indexAnchorNode);

    const { findAllTags } = findClosedTagNull(extractedValue);
    const outerHtmlLeft = innerHtml.split(extractedValue)[0];
    const outerHtmlRight = innerHtml.split(extractedValue)[1];

    return {
        anchorNode,
        findAllTags,
        outerHtmlLeft,
        outerHtmlRight,
        extractedValue,
    }
}

function findClosedTagNull(value) {
    let { all } = {
        all: /<u>|<\/u>|<strong>|<\/strong>|<i>|<\/i>|<p>|<\/p>/gi,
    };
    let findAllTags = value.match(all) ? value.match(all).join('') : '';
    return {
        findAllTags,
    }
}