import styled from 'styled-components'

export const StyledList = styled.div`
    border: 1px solid #3c3c3c;
    border-radius: 3px;
    background-color: transparent;
    width: 100%;
    transition: 500ms;
    display: flex;
    flex-direction: column;
`

export const StyledListItem = styled.div`
    border: none;
    border-bottom: 1px solid #525252;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    transition: 500ms;
    cursor: pointer;
    &:hover {
        background-color: #525250;
    }
    & > div {
        display: flex;
        flex-direction: row;
        margin: '5px 0'
    }
    & p {
        margin: 5px;
        
    }
`
