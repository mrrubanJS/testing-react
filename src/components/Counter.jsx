import React from "react";
import { useState } from "react";

const Counter = function (){
    const [count, setCount] = useState(0)
    function increment(){
        setCount(count+1)
      }
      function decrement(){
        setCount(count-1)
      }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}> Incr</button>
         <button onClick={decrement}> decr </button>
        </div>
    )
}

export default Counter