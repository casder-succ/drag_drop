import React from 'react';
import styled from 'styled-components';
import Lane from '../components/Lane/Lane';
import WithDataFetch from "../WithDataFetch";   

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

        this.onDrop = this.onDrop.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({tickets: this.props.data});
        }
    }

    onDragStart(e, id) {
        e.dataTransfer.setData('id', id);
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDrop(e, laneId) {
        const ticketId = e.dataTransfer.getData('id');



        const tickets = this.state.tickets.map(ticket => {
            if ('' + ticket.id === '' + ticketId) {
                ticket.lane = laneId;
            }
            return ticket;
        });

        this.setState({
            ...this.state,
            tickets,
        })
    }

    render() {
        const {lanes, error, loading} = this.props;

        return (
            <BoardWrapper>
                {lanes.map(lane => (
                    <Lane key={lane.id} title={lane.title}
                          laneId={lane.id}
                          tickets={this.state.tickets.filter(item => item.lane === lane.id)}
                          loading={loading}
                          error={error}
                          onDragStart={this.onDragStart}
                          onDragOver={this.onDragOver}
                          onDrop={this.onDrop}
                    />
                ))}
            </BoardWrapper>
        );
    }
}

export default WithDataFetch(Board);
