import React, {Component} from 'react';
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


const Board = ({lanes, data, error, loading}) => {
    return (
        <BoardWrapper>
            {lanes.map(lane => (
                <Lane key={lane.id} title={lane.title}
                      tickets={data.filter(item => item.lane === lane.id)}
                      loading={loading}
                      error={error}/>
            ))}
        </BoardWrapper>
    );
}

export default WithDataFetch(Board);
