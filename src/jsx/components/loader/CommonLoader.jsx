import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const CommonLoader = (props) => {
    const { loadingIndicator, height, width, color, wrapperStyle } = props;

    return (
        <ThreeDots
            visible={loadingIndicator}
            height={height ? height : "80"}
            width={width ? width : "80"}
            color={color ? color : "#6a73fa"}
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={wrapperStyle ? wrapperStyle : {}}
            wrapperClass=""
        />
    );
};

export default CommonLoader;
