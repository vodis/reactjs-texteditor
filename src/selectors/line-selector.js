import React from 'react';


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

    let extractedTag = <u></u>;
    let extractedValue = isDirectedForward 
        ? innerHtml.slice(indexAnchorNode, indexFocusNode)
        : innerHtml.slice(indexFocusNode, indexAnchorNode);
    
    let { findClosedTagU } = findClosedTagNull(extractedValue);
    let mutatedOuterHtml = innerHtml.split(extractedValue)[0] + findClosedTagU + innerHtml.split(extractedValue)[1];

    return {
        extractedTag,
        extractedValue,
        mutatedOuterHtml,
    }
}

function findClosedTagNull(value) {
    let { u } = {
        u: /<u>/gi,
    };

    let findClosedTagU = value.match(u) && value.lenght % 2 !== 0 && ('' || '<u>');

    return {
        findClosedTagU
    }
}