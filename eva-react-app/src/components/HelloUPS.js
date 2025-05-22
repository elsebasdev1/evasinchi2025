import React, { useState } from "react";
import { db } from '../firebase'; 
import {
  addDoc,
  collection,
} from "firebase/firestore";
import './style.css';

function HelloUPSComponent () {
    const [nombre, setNombre]=useState('');
    const [precio, setPrecio]=useState('');
    const [stock, setStock]=useState('');

    console.log("Renderizando componente HolaUPS");

  async function guardar() {
    if (!nombre.trim() || !precio.trim() || !stock.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }
    if(precio.startsWith('-') || stock.startsWith('-') || precio.startsWith('0') || stock.startsWith('0')){
      alert('Precio o stock invalido');
      return;        
    }

    const registro = {
      nombre: nombre.trim(),
      precio: precio.trim(),
      stock: stock.trim()
    };

    try {
        // Crear nuevo documento
        await addDoc(collection(db, 'products'), registro);
      
        setNombre('');
        setPrecio('');
        setStock('');
    } catch (error) {
      console.error("Error guardando contacto:", error);
    }
  }
    
    return (
        <div>
            <h1> Ingresar datos a Firestore </h1>
            <form onSubmit={(e) => { e.preventDefault(); guardar(); }}>
                <label htmlFor ="txtNombre"> Producto</label>
                <input id="txtNombre" type="text"
                    value={nombre} onChange = {(e) => setNombre(e.target.value)} />
                <label htmlFor="txtPrecio"> Precio </label>
                <input id="txtPrecio" type="text"
                    value={precio} onChange = {(e) => setPrecio(e.target.value)} />
                <label htmlFor="txtStock"> Stock </label>
                <input id="txtStock" type="text"
                    value={stock} onChange = {(e) => setStock(e.target.value)} />                    
                <button type="submit">{'Guardar'}</button>
            </form>
            <span>Vas a ingresar {nombre} con precio de {precio} y la cantidad es {stock}</span>
        </div>
        
    );
}

export default HelloUPSComponent;