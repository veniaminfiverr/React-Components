import React from "react";
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import SignUp from './components/SignUp/SignUp'




function App() {
    const [title,setTitle] = useState();
    const [desc,setDesc] = useState();
    const [savedProducts,setSavedProducts] = useState([]);
    const [foundProduct,setFoundProduct] = useState();

    /*useEffect(()=>{
        axios.get('http://localhost:5000/api/products').then((products)=>{
            const prods = [];
            products.data.map(product =>{
                prods.push({title: product.title, desc: product.description})
            });
            setSavedProducts(prods);
        })
    },[])*/

    const submitHandler = async event => {
        event.preventDefault();
        const product = {
            title: title,
            description: desc
        }
        axios.post('http://localhost:5000/api/products',product).then((resp)=>{
           const prods = [...savedProducts];
           prods.push({title: resp.data.title, desc: resp.data.description});
           setSavedProducts(prods);
        });
    };

    const findSubmitHandler = async event => {
        event.preventDefault();
        axios.get('http://localhost:5000/api/products/'+title).then((resp)=>{
            setFoundProduct({title: resp.data[0].title, desc: resp.data[0].description});
        });
    };

  return (
      <div>
          <SignUp/>
      </div>

    // <div className="App">
    //     <form onSubmit={submitHandler}>
    //       Title: <input name="title" onChange={(e)=>{setTitle(e.target.value)}}/>
    //       Description: <input name="description" onChange={(e)=>{setDesc(e.target.value)}}/>
    //       <input type="submit" value="Submit"/>
    //     </form>
    //     <table border={2}>
    //         <tbody>
    //         <tr>
    //             <th>
    //                 Title
    //             </th>
    //             <th>
    //                 Description
    //             </th>
    //         </tr>
    //     {
    //         savedProducts ? savedProducts.map(product => (
    //             <tr key={product.title}>
    //                 <td> {product.title}</td>
    //                 <td> {product.desc}</td>
    //             </tr>
    //         )) : ''
    //     }
    //         </tbody>
    //     </table>
    //     <form onSubmit={findSubmitHandler}>
    //         Find: <input name="title" onChange={(e)=>{setTitle(e.target.value)}}/>
    //         <input type="submit" value="Submit"/>
    //     </form>
    //     {
    //         foundProduct ? (
    //             <div>
    //                 Found Product =   Title: {foundProduct.title}, Desc: {foundProduct.desc}
    //             </div>
    //         ) : ''
    //     }
    // </div>
  );
}

export default App;
