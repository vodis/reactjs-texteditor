import React from 'react';

export const themes = {
    setOfButtons: [],
}

export const ThemeContext = React.createContext({
    activeButtons: themes.setOfButtons,
});