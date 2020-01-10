import React from 'react';

export const themes = {
    setOfButtons: [],
    setForwardRef: null,
    setOfRangeText: "",
}

export const ThemeContext = React.createContext({
    activeButtons: themes.setOfButtons,
    ref: themes.setForwardRef,
    rangeText: themes.setOfRangeText,
});