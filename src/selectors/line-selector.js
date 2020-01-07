export const setStart = () => {
    const { anchorNode, anchorOffset } = document.getSelection();
    return {
        node: anchorNode && anchorNode.data,
        offset: anchorOffset,
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

    let { findAllTags } = findClosedTagNull(extractedValue);
    let mutatedOuterHtml = innerHtml.split(extractedValue)[0] + findAllTags + innerHtml.split(extractedValue)[1];

    return {
        extractedValue,
        findAllTags,
        mutatedOuterHtml,
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