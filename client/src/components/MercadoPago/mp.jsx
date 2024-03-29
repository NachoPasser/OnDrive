import { useEffect, useState } from 'react'
import s from '../MercadoPago/mp.module.css'

export default function Comprar({  data }) {
  useEffect(() => {
    const script = document.createElement('script'); //Crea un elemento html script

    const attr_data_preference = document.createAttribute('data-preference-id') //Crea un nodo atribute
    attr_data_preference.value = data.id  //Le asigna como valor el id que devuelve MP

    //Agrega atributos al elemento script
    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference)

    console.log(data)

    //Agrega el script como nodo hijo del elemento form
    document.getElementById('form1').appendChild(script)
    return () => {
      //Elimina el script como nodo hijo del elemento form
      document.getElementById('form1').removeChild(script);
    }
  }, [data])

  return (
    <div className={s.general}>

        {/* { <div className={s.gridContainer} > /} */}

        <form className={s.form1} id="form1">
        </form>
         {/* </div>  */}

    </div>
  )
}