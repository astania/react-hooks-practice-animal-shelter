import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  useEffect(() => {
    fetch("http://localhost:3001/pets")
      .then(r => r.json())
      .then(allPets => setPets(allPets))

  }, [])

  const handlePetAdoption = (updatedPet) => {
    const updatedPets = pets.map( pet => {
      if(pet.id === updatedPet.id){
        return updatedPet
      } else {
        return pet
      }
    })

    setPets(updatedPets)
  }

  const handleChangeType = (event) => {
    const selectedType = event.target.value
    setFilters({type: selectedType})

  }

  const handleFindPets = () => {
    if (filters.type === "all") {
      fetch(`http://localhost:3001/pets`)
      .then(r => r.json())
      .then(selectedPets => setPets(selectedPets))
    } else {
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
      .then(r => r.json())
      .then(selectedPets => setPets(selectedPets))
    }
  }





  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters filters={filters} setFilters={setFilters} onChangeType={handleChangeType} onFindPets={handleFindPets}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handlePetAdoption}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
