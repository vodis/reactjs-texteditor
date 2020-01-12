import React, { Component, Fragment } from 'react'

class TooltipList extends Component {
    state = {
        isOpen: false,
        synonyms: [],
    }

    componentDidMount() {
        const { word } = this.props;
        this.fetchSynonyms(word);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.word !== this.state.word) {
            this.fetchSynonyms(this.props.word);
        }
    }

    fetchSynonyms = async (value) => {
        try {
            const data = await fetch(`https://api.datamuse.com//words?ml=${value}`);
            const json = await data.json();
            this.setState(() => ({
                isOpen: true,
                word: value,
                synonyms: json,
            }));
        } catch (error) {
            throw new Error(error);
        }
    }

    renderPopup = () => {
        const { synonyms } = this.state;

        if (synonyms.length) {
            return null;
        }
        
        synonyms.length = 10;
        return (
            <ol>
                { synonyms.map((syn, i) => {
                    return (
                        <li key={i}>{syn.word}</li>
                    )}) 
                }
            </ol>
        )
    }

    render() {
    
        return (
            <Fragment>
                {this.renderPopup()}
            </Fragment>
        )
    }
}

export default TooltipList;
