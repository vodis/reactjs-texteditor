export const setStart = () => {
    const { anchorNode, anchorOffset } = document.getSelection();
    return {
        node: anchorNode && anchorNode.data,
        offset: anchorOffset,
    }
}

export const getRange = () => {
    const range = document.createRange();
    // let text = range.startContainer.innerText;
    console.log(this)
    console.log(range.focusNode)
    console.log(range, range.startContainer.activeElement)
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