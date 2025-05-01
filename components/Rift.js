import React from "react";

const FutsalField = ({ bg = "#0", className = "" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="511.828 282.841 238.369 238.592">
        <path
            className={className}
            d="
            M561.828 377.941V332.841h90.344L641.537 343.411 630.903 353.979l-23.962.008-23.96.008-.027 24.071-.027 
            24.072-10.55 10.45-10.549 10.452zM620.546 460.856l10.575-10.576H679.046V402.213l4.317-4.461c2.374-2.454 
            7.133-7.213 10.576-10.576l6.259-6.115V471.432H609.973Z
            "
            fill={bg}
            stroke="#ffffff"
            strokeLinecap="square"
            strokeWidth="3.111"
            fillOpacity="1"
        />
        <path
            className={className}
            d="
            M561.828 458.157V444.881l56.02-56.02 56.02-56.019h26.329V359.394l-56.02 56.019-56.02 56.02H561.829Z
            "
            fill={bg}
            stroke="#ffffff"
            strokeLinecap="square"
            strokeWidth="3.111"
            fillOpacity="1"
        />
        </svg>
    );
};

export default FutsalField;