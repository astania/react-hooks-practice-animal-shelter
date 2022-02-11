import React from "react";



function Pet({ pet, onAdoptPet }) {

  // const [adoptPet, setAdoptPet] = useState(pet.isAdopted)

  const handleAdoption = () => {
    fetch(`http://localhost:3001/pets/${pet.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isAdopted: !pet.isAdopted,
      }),
    })
      .then(r => r.json())
      .then(updatedPet => onAdoptPet(updatedPet))
  }

  return (
    <div className="card" data-testid="pet">
      <div className="content">
        <span className="header">
          {pet.gender === "female" ? '♀' : '♂'}
          {pet.name}
        </span>
        <div className="meta">
          <span className="date">{pet.type}</span>
        </div>
        <div className="description">
          <p>Age: {pet.age}</p>
          <p>Weight: {pet.weight}</p>
        </div>
      </div>
      <div className="extra content">
        {pet.isAdopted ? <button className="ui disabled button">Already Adopted</button> : <button onClick={handleAdoption} className="ui primary button">Adopt pet</button>}


      </div>
    </div>
  );
}

export default Pet;
