import React from "react";

export default function WithDataFetch (Component) {
    class WithDataFetch extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                data: [],
                loading: false,
                error: '',
            };
        }

        async componentDidMount() {
            try {
                this.setState({loading: true});

                const data = await fetch(this.props.dataSource);
                const dataJSON = await data.json();

                if (dataJSON) {
                    this.setState({
                        loading: false,
                        data: dataJSON,
                    });
                }
            } catch (e) {
                this.setState({error: e.message, loading: false});
            }
        }

        render() {
            const {data, loading, error} = this.state;

            return (
                <Component
                    data={data}
                    loading={loading}
                    error={error}
                    {...this.props}
                />
            )
        }
    }

    WithDataFetch.displayName = `WithDataFetch(${Component.name})`;
    return WithDataFetch;
}