import React from 'react';

const TestComponent = ({element}) => {
    const re = />>[0-9]+/
    let ind = element.indexOf('>>')
    const number = element.slice(ind)
    const numberOnlyDigits = element.slice(ind+2)
    const text = element.slice(0, ind)
    // console.log(text)
    // console.log(number)



    return (
        <span>
            {text}
            <a className={'appLink'} href={"#"+numberOnlyDigits}>{number}</a>
        </span>
    );
};

export default TestComponent;