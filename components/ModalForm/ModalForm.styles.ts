import styled from "styled-components/native";

const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 22,
`;

const ModalView = styled.View`
    margin: 20px;
    background-color: white;
    border-radius: 20;
    padding: 35px;
    align-items: center;
    shadow-color: #000;
    shadow-offset: {
        width: 0,
        height: 2,
    };
`;

const ModalTitle = styled.View`
    align-items: center;
    justify-content: center;
    margin-bottom: 5%;
`;

export { CenteredView, ModalView, ModalTitle };