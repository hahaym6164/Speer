import React from 'react';
import ReactDOM from 'react-dom';

let params = [{
    num: 12,
    name: 'peter'
},
    {
        num:34,
        name:'bunny'
    }
]

const Calls = () => {
  return (           
       <div className='calls'>
           test
           {params.map(call => 
            {
                <li>Name: {call.name} Number: {call.num} test</li>
            }
            )}
        
             </div>
 );
};


export default Calls;
