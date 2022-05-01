import React from 'react';
import styled from 'styled-components';
import Lane from '../components/Lane/Lane';
import WithDataFetch from "../WithDataFetch";
import tickets from "./Tickets";

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({tickets: this.props.data});
        }
    }

    onDragStart(e, id) {
        e.dataTransfer.setData('id', id);
    }

    render() {
        const {lanes, error, loading} = this.props;

        return (
            <BoardWrapper>
                {lanes.map(lane => (
                    <Lane key={lane.id} title={lane.title}
                          tickets={this.state.tickets.filter(item => item.lane === lane.id)}
                          loading={loading}
                          error={error}
                          onDragStart={this.onDragStart}
                    />
                ))}
            </BoardWrapper>
        );
    }
}

export default WithDataFetch(Board);
