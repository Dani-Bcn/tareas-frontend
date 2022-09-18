import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditChild() {
const date = new Date();
const actualYear = date.getFullYear();
console.log(actualYear)
const navigate = useNavigate();
const { id } = useParams();
const [child, setChild] = useState(null);
//primero obtenemos las datos de Child
  useEffect(() => {
    const getData = async () => {
      try {
        const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`,);
        setChild(getChild.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id])
//Vamos guardando los valoes conforme escribimos
  const handleChange = (e) => {
    setChild(prev => { 
      return {
        ...prev,        
        [e.target.name]: e.target.value       
      }
    })  
  }
  const handleSubmit = async (e) => {
      //console.log(child)
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/child/${id}`, {name: child.name, yearOfBirth: child.yearOfBirth, points: child.points, cups: child.cups, pointsCup: child.pointsCup} );
      navigate(`/ListChilds`)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h1>Edit Child</h1>
      {!child && <p>Loading</p>}
      {child && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={child.name} onChange={handleChange} />
          <input type="number"  min={1980} max={actualYear} name="yearOfBirth" placeholder="2015" value={child.yearOfBirth} onChange={handleChange} />
          <input type="number"  placeholder="Points" min={0}  name="points" value={child.points} onChange={handleChange} />
          <input type="number"  min="0"  name="cups" placeholder="Cups" value={child.cups} onChange={handleChange} />
          <button type="submit">Save changes</button>
        </form>
      )}
    </div>
  )
} 