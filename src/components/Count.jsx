/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Count() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/`); 
   
        setCount(response.data.data[0])
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
  return (
    <div>
      <p>Count</p>
      {count && (
        <div>      
            <h6 > Name  {count.username}</h6><button>Edit</button>
            <h6 > Email {count.email}</h6><button>Edit</button>  
            <h6 > Password ******** </h6><button>Edit</button>         
        </div>
        )}
      {!count && <p>count not found</p>}
    </div>
  )
}