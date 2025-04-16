import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ResultProvider, ResultContext } from './ResultProvider';

const ResultProviderWrapper = ({ children }) => {
    const navigate = useNavigate();

    return (
        <ResultProvider navigate={navigate}>
            {children}
        </ResultProvider>
    );
};

export { ResultContext };
export default ResultProviderWrapper;