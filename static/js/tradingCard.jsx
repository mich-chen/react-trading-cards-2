// const tradingCardData = [
//   {
//     name: 'Balloonicorn',
//     skill: 'video games',
//     imgUrl: '/static/img/balloonicorn.jpg'
//   },

//   {
//     name: 'Float',
//     skill: 'baking pretzels',
//     imgUrl: '/static/img/float.jpg'
//   },

//   {
//     name: 'Llambda',
//     skill: 'knitting scarves',
//     imgUrl: '/static/img/llambda.jpg'
//   }
// ];

function AddNewCard() {

  // const makeNewCard = () => {
  //   return (
  //     newCard = {
  //       name: document.querySelector('#nameField'),
  //       skill: document.querySelector('#skillField')
  //     }
  //   )
  // }
  // console.log(newCard);

// text input

 const handleNameChange = (e) => {setName(e.currentTarget.value)};
 // track state of input
 // whenever user makes change, can update changes
 const [name, setName] = React.useState('');

 const [skill, setSkill] = React.useState('');

  const handleSkillChange = (e) => {setSkill(e.currentTarget.value)};

// 
  const handleClick = (e) => {
    const newCard = {
      name: name,
      skill: skill
    };
    fetch('/add-card', {method: 'POST', body: JSON.stringify(newCard), headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }}
      )
    // jsonify object
  }



  // POST request to backend to make new card -> fetch when user clicks submit button
  // reload card data
  // .onChange
  // hold value in text box in state
  // for each input

  return (
      <div>
        <h2>Add New Trading Card</h2>

        Name <input type="text" id="nameField" onChange={handleNameChange}></input>
        Skill <input type="text" id="skillField" onChange={handleSkillChange}></input>
        <button id="addCard" onClick={handleClick}>Add</button>
      </div>
    );
}



function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} />
      <p>Skill: {props.skill} </p>
    </div>
  );
}

function TradingCardContainer() {

   const floatCard = {
    name: 'Float',
    skill: 'baking pretzels',
    imgUrl: '/static/img/float.jpg'
  };

  const [cards, updateCards] = React.useState([floatCard]);

  React.useEffect(() => {
    fetch('/cards.json')
    .then((res) => res.json())
    // the above json'ed response === data for below
    .then((data) => updateCards(data))
  }, []);

  const tradingCards = [];

  for (const currentCard of cards) {
    tradingCards.push(
      <TradingCard
        key={currentCard.name}
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />
    );
  }

  return (
    <div>{tradingCards}</div>
  );
}


function App() {
  return (
    <div>
      <AddNewCard />

      <TradingCardContainer />

    </div>
    );
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
