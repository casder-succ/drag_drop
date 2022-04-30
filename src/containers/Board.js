import React, {Component} from 'react';
import styled from 'styled-components';
import Lane from '../components/Lane/Lane';

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

class Board extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            error: '',
        };
    }

    async componentDidMount() {
        try {
            this.setState({loading: true});

            const data = await fetch('assets/data.json');
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
        const lanes = [
            {id: 1, title: 'To Do'},
            {id: 2, title: 'In Progress'},
            {id: 3, title: 'Review'},
            {id: 4, title: 'Done'},
        ];

        return (
            <BoardWrapper>
                {lanes.map(lane => (
                    <Lane key={lane.id} title={lane.title}
                          tickets={this.state.data.filter(item => item.lane === lane.id)}
                          loading={this.state.loading}
                          error={this.state.error}/>
                ))}
            </BoardWrapper>
        );
    }
}

export default Board;
