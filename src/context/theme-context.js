import React from 'react';

export const themes = {
    setOfButtons: [],
    setForwardRef: null,
    setOfRangeText: "",
    replaceText: "",
}

export const ThemeContext = React.createContext({
    activeButtons: themes.setOfButtons,
    ref: themes.setForwardRef,
    rangeText: themes.setOfRangeText,
    replaceText: themes.replaceText,
});