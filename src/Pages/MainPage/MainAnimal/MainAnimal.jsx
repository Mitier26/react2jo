import React from 'react'
import { useCampingAnimal } from '../../../hooks/useCampingAnimal'
import { Alert } from 'react-bootstrap';


const MainAnimal = () => {
    const {data,isLoading,isError,error} = useCampingAnimal();
    const animalList = data?.response.body.items.item;
    let animalItems = [];
    if (animalList) {
        animalList.map((item)=>{
            if (animalItems.length<5 && item.animalCmgCl != '불가능') {
                animalItems.push(item);
            }
        })      
    }
    if (isLoading) {
      return <h1>loading</h1>
    }
    if (isError) {
      return <Alert>{error.message}</Alert>
    }
    console.log(animalList)
    console.log(animalItems)
  return (
    <div>
      
    </div>
  )
}

export default MainAnimal
