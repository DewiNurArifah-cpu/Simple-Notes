import React from "react";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        // Initialize state dengan empty search
        this.state = {
            search: ''
        };
        this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
    }
    onSearchChangeHandler(event) {
        const searchValue = event.target.value;

        this.setState(() => {
            return {
                search: searchValue
            };
        });
        this.props.onChange(searchValue);
    }

    render() {
        return (
            <div className="note-search">
                <input
                    type="text"
                    placeholder="Cari catatan..."
                    value={this.state.search}
                    onChange={this.onSearchChangeHandler}
                />
            </div>
        );
    }
}

export default SearchBar;