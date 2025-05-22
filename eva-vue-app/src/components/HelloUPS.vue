<template>
    <h1>Listado de productos de Firebase</h1>           
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in lista" :key="index">
            <td> {{ producto.nombre }} </td>
            <td> {{ producto.precio }}</td>
            <td> {{ producto.stock }}</td>
            <td>
              <button @click="eliminar(producto.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>      
</template>

<script>
import { db } from '../firebase'; 
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

export default {
  data() {
    return {
      nombre: '',
      precio: '',
      stock: '',
      lista: [],
      editando: null
    }
  },
  mounted() {
      this.cargarDatos();
    },  
  methods: {
    async cargarDatos() {
      const contactosRef = collection(db, 'products');

      onSnapshot(contactosRef, (querySnapshot) => {
        this.lista = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      }, (error) => {
        console.error('Error en la escucha de Firestore:', error);
      });
    },
    async eliminar(id) {
      if (!confirm('¿Estás seguro de eliminar este producto?')) return;
      try {
        const contactoRef = doc(db, 'products', id);
        await deleteDoc(contactoRef);
        await this.cargarDatos(); // Refrescar lista después de borrar
      } catch (e) {
        console.error('Error al eliminar:', e);
      }
    }    
  }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 50%;
    margin-top: 20px;
    background-color: #e8f5e9; /* Verde muy claro */
    color: #1b5e20; /* Verde oscuro para el texto */
    font-family: Arial, sans-serif;
    margin: auto;
  }
  
  th, td {
    border: 1px solid #66bb6a; /* Borde verde medio */
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #a5d6a7; /* Verde más fuerte para encabezados */
  }
  
  tr:nth-child(even) {
    background-color: #c8e6c9; /* Verde claro para filas pares */
  }
  
  tr:hover {
    background-color: #81c784; /* Verde al pasar el mouse */
  }
  
  button {
    margin-right: 5px;
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:hover {
    background-color: #388e3c;
  }
</style>