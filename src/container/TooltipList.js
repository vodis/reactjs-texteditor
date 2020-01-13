import React, { Fragment } from 'react'

class TooltipList extends React.PureComponent {
    state = {
        word: '',
        synonyms: [],
    }

    componentDidMount() {
        const { word } = this.props;
        this.fetchSynonyms(word);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.word !== this.state.word) {
            this.fetchSynonyms(nextProps.word);
            return true;
        }
    }

    fetchSynonyms = async (value) => {
        try {
            const data = await fetch(`https://api.datamuse.com//words?ml=${value}`);
            const json = await data.json();
            this.setState(() => ({
                word: value,
                synonyms: json,
            }));
        } catch (error) {
            throw new Error(error);
        }
    }

    renderPopup = () => {
        const { synonyms } = this.state;
        return (
            <ol>
                { synonyms.length && synonyms.slice(0, 10).map((syn, i) => {
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
