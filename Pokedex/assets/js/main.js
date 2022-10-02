let typ1 = '';
let typ2 = '';
let pokeEvolutionName = '';

window.speechSynthesis.cancel();

const dialogWelcome = document.getElementById('modulWelcome');
const dialogOak = document.getElementById('modulOak');

const welcome = () => {
	const nameTrainer = document.getElementById('nameTrainer').value;
	console.log(nameTrainer);

	const pikaRun = document.getElementById('pikaRun');
	pikaRun.style.display = 'none';

	dialogWelcome.style.display = 'none';
	dialogOak.style.display = '';

	var i = 0;
	var tag = document.getElementById('text');
	var html =
		'Hallo ' +
		nameTrainer +
		', mein Name ist Professor Eich, <br /><br />ich habe für dich diesen Pokedex entwickelt. Der Pokédex ist das Lexikon für Pokémon, somit lassen sich sehr viele verschiedene Informationen über ein Pokémon nachlesen. <br /><br />Bevor du dich in das Abenteuer stürzt, wähle noch ein Pokémon aus, welches dich auf deiner Reise begleiten wird. <br /><br />Du kannst		wählen zwischen Bisasam, Glumanda und Schiggy. <br />Klicke auf dein gewünschtes Pokémon.';
	var attr = tag.setAttribute('data', html);
	var txt = tag.getAttribute('data');
	var speed = 55;
	tag.style.display = 'none';

	function welcomeTextSpeak() {
		var startText =
			'Hallo ' +
			nameTrainer +
			', mein Name ist Professor Eich,ich habe für dich diesen Pokedex entwickelt. Der Pokédex ist das Lexikon für Pokémon, somit lassen sich sehr viele verschiedene Informationen über ein Pokémon nachlesen. Bevor du dich in das Abenteuer stürzt, wähle noch ein Pokémon aus, welches dich auf deiner Reise begleiten wird. Du kannst		wählen zwischen Bisasam, Glumanda und Schiggy. Klicke auf dein gewünschtes Pokémon.';
		var msg = new SpeechSynthesisUtterance();
		var voices = window.speechSynthesis.getVoices();
		msg.volume = 0.5;
		msg.rate = 0.9;
		msg.pitch = 1;
		msg.text = startText;
		msg.lang = voices[48].lang;
		speechSynthesis.speak(msg);
	}
	setTimeout(welcomeTextSpeak, 3000);

	function welcomeText() {
		tag.style.display = 'block';
		function typeWriter() {
			if (i <= txt.length) {
				document.getElementById('text').innerHTML = txt.slice(0, i + 1);
				i++;
				setTimeout(typeWriter, speed);
			}
		}
		typeWriter();
	}
	setTimeout(welcomeText, 3500);
};

function bisasam() {
	document.body.classList.add('bisasam');
	let selectPokemon = document.getElementById('selectPokemon');
	selectPokemon.innerHTML = 'Dein gewähltes Pokemon ist Bisasam 💚';
}
function glumanda() {
	document.body.classList.add('glumanda');
	let selectPokemon = document.getElementById('selectPokemon');
	selectPokemon.innerHTML = 'Dein gewähltes Pokemon ist Glumanda ❤️';
}
function schiggy() {
	document.body.classList.add('schiggy');
	let selectPokemon = document.getElementById('selectPokemon');
	selectPokemon.innerHTML = 'Dein gewähltes Pokemon ist Schiggy 💙';
}

const pokemons_number = 151;

const fetchPokemons = async () => {
	dialogOak.style.display = 'none';

	for (let i = 1; i <= pokemons_number; i++) {
		await new Promise((resolve) => setTimeout(resolve, 250));
		await getPokemon(i);
	}
};

const getPokemon = async (id) => {
	let urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
	let resSpecies = await fetch(urlSpecies);
	let dataSpecies = await resSpecies.json();

	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const data = await res.json();

	if (data.types.length == 2) {
		typUrl = data.types[0].type.url;
		typUrl2 = data.types[1].type.url;
	} else {
		typUrl = data.types[0].type.url;
	}

	const url1 = `${typUrl}`;
	const res1 = await fetch(url1);
	const data1 = await res1.json();

	const url2 = `${typUrl2}`;
	const res2 = await fetch(url2);
	const data2 = await res2.json();

	nameGer = dataSpecies.names[5].name;
	typGer = data1.names[4].name;
	typGer2 = data2.names[4].name;
	createPokemonCard(data);
};
const createPokemonCard = (pokemon) => {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('card');
	const ids = pokemon.id.toString().padStart(3, '0');
	if (pokemon.types.length == 2) {
		typ1 = typGer[0].toUpperCase() + typGer.slice(1);
		typ2 = typGer2[0].toUpperCase() + typGer2.slice(1);
	} else {
		typ1 = typGer[0].toUpperCase() + typGer.slice(1);
	}

	const pokeInnerHTML = `
				<div class="pokemon -${typ1} customOpen" onclick="modal_popup(${pokemon.id})">
          <div class="img-container" >
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="{name}" />
          </div>
          <div class="info">
            <span class="number">N° ${pokemon.id < 10 ? `#00${pokemon.id}` : `${pokemon.id}` < 100 ? `#0${pokemon.id}` : `#${pokemon.id}`}</span>
            <h3 class="name">${nameGer}</h3>
            <p class="type-container">
              <span>
              ${
								pokemon.types.length == 2
									? `<span class="poke-type-name -${typ1}">${typ1}</span> 
                
									<span class="poke-type-name -${typ2}">${typ2}</span> 
                    `
									: `
                    <span class="poke-type-name -${typ1}">${typ1}</span> 
                `
							}
              </span>
            </p>
          </div>
        </div>
      `;
	pokemonEl.innerHTML = pokeInnerHTML;
	listPokemonAll.appendChild(pokemonEl);
};

function startPokedex() {
	window.speechSynthesis.cancel();
	fetchPokemons();
	dialogOak.style.display = 'none';
}

async function modal_popup(id) {
	evolutionURL(id);
}

const evolutionURL = (id) => {
	fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
		.then((response) => response.json())
		.then((data) => {
			const evolChain = data.evolution_chain.url;

			namePopGer = data.names[5].name;
			let germanEntry0 = data.flavor_text_entries.filter(({ language }) => language.name === 'de');
			let germanEntry = data.flavor_text_entries.filter(({ language, version }) => language.name === 'de' && version.name === 'y');
			let germanEntry2 = data.flavor_text_entries.filter(({ language, version }) => language.name === 'de' && version.name === 'omega-ruby');
			let germanEntry3 = data.flavor_text_entries.filter(({ language, version }) => language.name === 'de' && version.name === 'lets-go-pikachu');
			let germanEntry4 = data.genera.filter(({ language }) => language.name === 'de');

			textSpecies = germanEntry[0].flavor_text;
			textSpecies2 = germanEntry2[0].flavor_text;
			textSpecies3 = germanEntry3[0].flavor_text;
			textSpecies4 = germanEntry4[0].genus;

			getPokeEvolution(evolChain, id);
		});
};

const getPokeEvolution = (url, id) => {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const checkEvolution = data.chain.evolves_to;

			if (checkEvolution.length == 0) {
				let evolutionChain = [];
				evolutionChain.push(data.chain.species.name);
				pokemonEvolution(evolutionChain, id);
			} else if (checkEvolution.length == 2) {
				let evolutionChain = [];
				evolutionChain.push(data.chain.species.name);
				evolutionChain.push(data.chain.evolves_to[0].species.name);
				evolutionChain.push(data.chain.evolves_to[1].species.name);
				pokemonEvolution(evolutionChain, id);
			} else if (checkEvolution.length == 8) {
				let evolutionChain = [];
				evolutionChain.push(data.chain.species.name);
				evolutionChain.push(data.chain.evolves_to[0].species.name);
				evolutionChain.push(data.chain.evolves_to[1].species.name);
				evolutionChain.push(data.chain.evolves_to[2].species.name);
				evolutionChain.push(data.chain.evolves_to[3].species.name);
				evolutionChain.push(data.chain.evolves_to[4].species.name);
				evolutionChain.push(data.chain.evolves_to[5].species.name);
				evolutionChain.push(data.chain.evolves_to[6].species.name);
				evolutionChain.push(data.chain.evolves_to[7].species.name);
				pokemonEvolution(evolutionChain, id);
			} else if (checkEvolution.length == 1) {
				if (data.chain.evolves_to[0].evolves_to.length == 1) {
					let evolutionChain = [];
					evolutionChain.push(data.chain.species.name);
					evolutionChain.push(data.chain.evolves_to[0].species.name);
					evolutionChain.push(data.chain.evolves_to[0].evolves_to[0].species.name);
					pokemonEvolution(evolutionChain, id);
				} else {
					let evolutionChain = [];
					evolutionChain.push(data.chain.species.name);
					evolutionChain.push(data.chain.evolves_to[0].species.name);
					pokemonEvolution(evolutionChain, id);
				}
			}
		});
};

const pokemonEvolution = (evol, id) => {
	let promises_evolution = [];
	let promises_evolutionName = [];

	for (let i = 0; i < evol.length; i++) {
		const url = `https://pokeapi.co/api/v2/pokemon/${evol[i]}`;

		promises_evolution.push(fetch(url).then((res) => res.json()));

		const urls = `https://pokeapi.co/api/v2/pokemon-species/${evol[i]}`;
		promises_evolutionName.push(fetch(urls).then((res) => res.json()));
	}
	Promise.all(promises_evolutionName).then((results) => {
		const pokeEvolutionNameGer = results.map((result) => ({
			name: result.names[5].name,
		}));
		pokeEvolutionName = pokeEvolutionNameGer;
	});
	Promise.all(promises_evolution).then((results) => {
		const pokeEvolution = results.map((result) => ({
			name: result.name,
			id: result.id,
			//image: result.sprites.other.dream_world.front_default,
			image: result.sprites.other['official-artwork'].front_default,
			types: result.types.map((type) => type.type.name),
		}));
		poke_modal(pokeEvolution, id);
	});
};

async function poke_modal(pokeEvolution, id) {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const poke_modal = await res.json();

	if (poke_modal.types.length == 2) {
		typUrl = poke_modal.types[0].type.url;
		typUrl2 = poke_modal.types[1].type.url;
	} else {
		typUrl = poke_modal.types[0].type.url;
	}

	const url1 = `${typUrl}`;
	const res1 = await fetch(url1);
	const data1 = await res1.json();

	const url2 = `${typUrl2}`;
	const res2 = await fetch(url2);
	const data2 = await res2.json();

	nameGer = namePopGer;
	typGer = data1.names[4].name;
	typGer2 = data2.names[4].name;

	displayPopup(poke_modal, pokeEvolution);
}

const pokeApp = document.getElementById('poke-app');
const modalBox = document.getElementById('pokeCardPopup');
const modalBox2 = document.getElementById('modal-name');

function displayPopup(poke_modal, pokeEvolution) {
	modalBox2.style.display = 'block';
	const evolution = pokeEvolution;
	let evolutionHTML = '';

	if (evolution.length == 9) {
		evolutionHTML = `	<div class="evol-box">
			<div class="evol-title">
				<h2>Entwicklung</h2>
			</div>
			<div class="evol-cycle">
				<div class="evol-next-info">
					<div class="img-container-evoli">
						<img src="${evolution[0].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[0].id < 10 ? `#00${evolution[0].id}` : `${evolution[0].id}` < 100 ? `#0${evolution[0].id}` : `#${evolution[0].id}`}</span>
						<span>-</span>
						<span>${pokeEvolutionName[0].name}</span>
					</div>
				</div>
				<div class="evol-next">
					<div class="arrow">
						<svg class="poke-arrow-evoli" viewBox="0 0 26 13">
							<path d="M 20.854 0.146 a 0.5 0.5 0 0 0 -0.707 0.707 L 24.293 5 L 0.5 5 a 0.5 0.5 0 0 0 0 1 h 23.793 l -4.146 4.145 a 0.5 0.5 0 0 0 0.708 0.707 l 5 -5 a 0.5 0.5 0 0 0 0 -0.707 L 20.854 0.146z"></path>
						</svg>
					</div>
				</div>
				<div class="evol-next-info">
					<div class="img-container-evoli">
						<img src="${evolution[1].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[1].id < 10 ? `#00${evolution[1].id}` : `${evolution[1].id}` < 100 ? `#0${evolution[1].id}` : `#${evolution[1].id}`}</span>
						<span>-</span>
						<span>${pokeEvolutionName[1].name}</span>
					</div>
				</div>

				<div class="evol-next">
					<div class="arrow">
						<svg class="poke-arrow-evoli" viewBox="0 0 26 13">
							<path d="M 20.854 0.146 a 0.5 0.5 0 0 0 -0.707 0.707 L 24.293 5 L 0.5 5 a 0.5 0.5 0 0 0 0 1 h 23.793 l -4.146 4.145 a 0.5 0.5 0 0 0 0.708 0.707 l 5 -5 a 0.5 0.5 0 0 0 0 -0.707 L 20.854 0.146z"></path>
						</svg>
					</div>
				</div>
				<div class="evol-next-info">
					<div class="img-container-evoli">
						<img src="${evolution[2].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[2].id < 10 ? `#00${evolution[2].id}` : `${evolution[2].id}` < 100 ? `#0${evolution[2].id}` : `#${evolution[2].id}`}</span>
						<span>-</span>
						<span>${pokeEvolutionName[2].name}</span>
					</div>
				</div>
				<div class="evol-next">
					<div class="arrow">
						<svg class="poke-arrow-evoli" viewBox="0 0 26 13">
							<path d="M 20.854 0.146 a 0.5 0.5 0 0 0 -0.707 0.707 L 24.293 5 L 0.5 5 a 0.5 0.5 0 0 0 0 1 h 23.793 l -4.146 4.145 a 0.5 0.5 0 0 0 0.708 0.707 l 5 -5 a 0.5 0.5 0 0 0 0 -0.707 L 20.854 0.146z"></path>
						</svg>
					</div>
				</div>
				<div class="evol-next-info">
					<div class="img-container-evoli">
						<img src="${evolution[3].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[3].id < 10 ? `#00${evolution[3].id}` : `${evolution[3].id}` < 100 ? `#0${evolution[3].id}` : `#${evolution[3].id}`}</span>
						<span>-</span>
						<span>${pokeEvolutionName[3].name}</span>
					</div>
				</div>
				<div class="evol-next">
					<div class="arrow">
						<svg class="poke-arrow-evoli" viewBox="0 0 26 13">
							<path d="M 20.854 0.146 a 0.5 0.5 0 0 0 -0.707 0.707 L 24.293 5 L 0.5 5 a 0.5 0.5 0 0 0 0 1 h 23.793 l -4.146 4.145 a 0.5 0.5 0 0 0 0.708 0.707 l 5 -5 a 0.5 0.5 0 0 0 0 -0.707 L 20.854 0.146z"></path>
						</svg>
					</div>
				</div>
				<div class="evol-next-info">
					<div class="img-container-evoli">
						<img src="${evolution[4].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[4].id < 10 ? `#00${evolution[4].id}` : `${evolution[4].id}` < 100 ? `#0${evolution[4].id}` : `#${evolution[4].id}`}</span>
						<span>-</span>
						<span>${pokeEvolutionName[4].name}</span>
					</div>
				</div>
				<div class="evol-next">
					<div class="arrow">
						<svg class="poke-arrow-evoli" viewBox="0 0 26 13">
							<path d="M 20.854 0.146 a 0.5 0.5 0 0 0 -0.707 0.707 L 24.293 5 L 0.5 5 a 0.5 0.5 0 0 0 0 1 h 23.793 l -4.146 4.145 a 0.5 0.5 0 0 0 0.708 0.707 l 5 -5 a 0.5 0.5 0 0 0 0 -0.707 L 20.854 0.146z"></path>
						</svg>
					</div>
				</div>
				<div class="evol-next-info">
					<div class="img-container-evoli">
						<img src="${evolution[5].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[5].id < 10 ? `#00${evolution[5].id}` : `${evolution[5].id}` < 100 ? `#0${evolution[5].id}` : `#${evolution[5].id}`}</span>
						<span>-</span>
						<span>${pokeEvolutionName[5].name}</span>
					</div>
				</div>
				<div class="evol-next">
					<div class="arrow">
						<svg class="poke-arrow-evoli" viewBox="0 0 26 13">
							<path d="M 20.854 0.146 a 0.5 0.5 0 0 0 -0.707 0.707 L 24.293 5 L 0.5 5 a 0.5 0.5 0 0 0 0 1 h 23.793 l -4.146 4.145 a 0.5 0.5 0 0 0 0.708 0.707 l 5 -5 a 0.5 0.5 0 0 0 0 -0.707 L 20.854 0.146z"></path>
						</svg>
					</div>
				</div>
				<div class="evol-next-info">
					<div class="img-container-evoli">
						<img src="${evolution[6].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[6].id < 10 ? `#00${evolution[6].id}` : `${evolution[6].id}` < 100 ? `#0${evolution[6].id}` : `#${evolution[6].id}`}</span>
						<span>-</span>
						<span>${pokeEvolutionName[6].name}</span>
					</div>
				</div>
				<div class="evol-next">
					<div class="arrow">
						<svg class="poke-arrow-evoli" viewBox="0 0 26 13">
							<path d="M 20.854 0.146 a 0.5 0.5 0 0 0 -0.707 0.707 L 24.293 5 L 0.5 5 a 0.5 0.5 0 0 0 0 1 h 23.793 l -4.146 4.145 a 0.5 0.5 0 0 0 0.708 0.707 l 5 -5 a 0.5 0.5 0 0 0 0 -0.707 L 20.854 0.146z"></path>
						</svg>
					</div>
				</div>
				<div class="evol-next-info">
					<div class="img-container-evoli">
						<img src="${evolution[7].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[7].id < 10 ? `#00${evolution[7].id}` : `${evolution[7].id}` < 100 ? `#0${evolution[7].id}` : `#${evolution[7].id}`}</span>
						<span>-</span>
						<span>${pokeEvolutionName[7].name}</span>
					</div>
				</div>
				<div class="evol-next">
					<div class="arrow">
						<svg class="poke-arrow-evoli" viewBox="0 0 26 13">
							<path d="M 20.854 0.146 a 0.5 0.5 0 0 0 -0.707 0.707 L 24.293 5 L 0.5 5 a 0.5 0.5 0 0 0 0 1 h 23.793 l -4.146 4.145 a 0.5 0.5 0 0 0 0.708 0.707 l 5 -5 a 0.5 0.5 0 0 0 0 -0.707 L 20.854 0.146z"></path>
						</svg>
					</div>
				</div>
				<div class="evol-next-info">
					<div class="img-container-evoli">
						<img src="${evolution[8].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[8].id < 10 ? `#00${evolution[8].id}` : `${evolution[8].id}` < 100 ? `#0${evolution[8].id}` : `#${evolution[8].id}`}</span>
						<span>-</span>
						<span>${pokeEvolutionName[8].name}</span>
					</div>
				</div>
			</div>
		</div>
	`;
	} else if (evolution.length == 3) {
		evolutionHTML = `			<div class="evol-box">
			<div class="evol-title">
				<h2>Entwicklung</h2>
			</div>
			<div class="evol-cycle">
				<div class="evol-next-info">
					<div class="img-container">
						<img src="${evolution[0].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[0].id < 10 ? `#00${evolution[0].id}` : `${evolution[0].id}` < 100 ? `#0${evolution[0].id}` : `#${evolution[0].id}`}</span>
						<span>-</span>
						<span>${pokeEvolutionName[0].name}</span>
					</div>
				</div>
				<div class="evol-next">
					<div class="arrow">
						<svg class="poke-arrow" viewBox="0 0 26 13">
							<path d="M 20.854 0.146 a 0.5 0.5 0 0 0 -0.707 0.707 L 24.293 5 L 0.5 5 a 0.5 0.5 0 0 0 0 1 h 23.793 l -4.146 4.145 a 0.5 0.5 0 0 0 0.708 0.707 l 5 -5 a 0.5 0.5 0 0 0 0 -0.707 L 20.854 0.146z"></path>
						</svg>
					</div>
				</div>
				<div class="evol-next-info">
					<div class="img-container">
						<img src="${evolution[1].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[1].id < 10 ? `#00${evolution[1].id}` : `${evolution[1].id}` < 100 ? `#0${evolution[1].id}` : `#${evolution[1].id}`}</span>
						<span>-</span>
						<span>${pokeEvolutionName[1].name}</span>
					</div>
				</div>

				<div class="evol-next">
					<div class="arrow">
						<svg class="poke-arrow" viewBox="0 0 26 13">
							<path d="M 20.854 0.146 a 0.5 0.5 0 0 0 -0.707 0.707 L 24.293 5 L 0.5 5 a 0.5 0.5 0 0 0 0 1 h 23.793 l -4.146 4.145 a 0.5 0.5 0 0 0 0.708 0.707 l 5 -5 a 0.5 0.5 0 0 0 0 -0.707 L 20.854 0.146z"></path>
						</svg>
					</div>
				</div>
				<div class="evol-next-info">
					<div class="img-container">
						<img src="${evolution[2].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[2].id < 10 ? `#00${evolution[2].id}` : `${evolution[2].id}` < 100 ? `#0${evolution[2].id}` : `#${evolution[2].id}`}</span>
						<span>-</span>
						<span>${pokeEvolutionName[2].name}</span>
					</div>
				</div>
			</div>
		</div>
	`;
	} else if (evolution.length == 2) {
		evolutionHTML = `<div class="evol-box">
			<div class="evol-title">
				<h2>Entwicklung</h2>
			</div>
			<div class="evol-cycle">
				<div class="evol-next-info">
					<div class="img-container">
						<img src="${evolution[0].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[0].id < 10 ? `#00${evolution[0].id}` : `${evolution[0].id}` < 100 ? `#0${evolution[0].id}` : `#${evolution[0].id}`}</span>
						<span>${evolution[0].name}</span>
					</div>
				</div>
				<div class="evol-next">
					<div class="arrow">
						<svg class="poke-arrow" viewBox="0 0 26 13">
							<path d="M 20.854 0.146 a 0.5 0.5 0 0 0 -0.707 0.707 L 24.293 5 L 0.5 5 a 0.5 0.5 0 0 0 0 1 h 23.793 l -4.146 4.145 a 0.5 0.5 0 0 0 0.708 0.707 l 5 -5 a 0.5 0.5 0 0 0 0 -0.707 L 20.854 0.146z"></path>
						</svg>
					</div>
				</div>
				<div class="evol-next-info">
					<div class="img-container">
						<img src="${evolution[1].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[1].id < 10 ? `#00${evolution[1].id}` : `${evolution[1].id}` < 100 ? `#0${evolution[1].id}` : `#${evolution[1].id}`}</span>
						<span>${evolution[1].name}</span>
					</div>
				</div>
			</div>
		</div>`;
	} else {
		evolutionHTML = `<div class="evol-box">
			<div class="evol-title">
				<h2>Keine Entwicklung für dieses Pokemon</h2>
			</div>
			<div class="evol-cycle">
				<div class="evol-next-info">
					<div class="img-container">
						<img src="${evolution[0].image}" alt="" />
					</div>
					<div class="info">
						<span>${evolution[0].id < 10 ? `#00${evolution[0].id}` : `${evolution[0].id}` < 100 ? `#0${evolution[0].id}` : `#${evolution[0].id}`}</span>
						<span>${evolution[0].name}</span>
					</div>
				</div>
			</div>
		</div>`;
	}

	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices()[9];
	msg.volume = 0.5;
	msg.rate = 0.8;
	msg.pitch = 1;
	msg.text = namePopGer + '........' + textSpecies + '........' + textSpecies2 + '........' + textSpecies3;
	msg.lang = 'de-DE';
	speechSynthesis.speak(msg);

	const img = new Image();
	img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + poke_modal.id + '.gif';

	const statsHp = poke_modal.stats[0].base_stat;

	const statsAttack = poke_modal.stats[1].base_stat;

	const statsDefense = poke_modal.stats[2].base_stat;

	const statsSpeed = poke_modal.stats[5].base_stat;

	const height = poke_modal.height / 10;
	const weight = poke_modal.weight / 10;

	if (poke_modal.types.length == 2) {
		typ1 = typGer[0].toUpperCase() + typGer.slice(1);
		typ2 = typGer2[0].toUpperCase() + typGer2.slice(1);
	} else {
		typ1 = typGer[0].toUpperCase() + typGer.slice(1);
	}

	var string = `${textSpecies} ` + ` ${textSpecies2}` + ` ${textSpecies3}`;

	const htmlString = `

			<div class="pokemonPopup -${poke_modal.types[0].type.name[0].toUpperCase() + poke_modal.types[0].type.name.slice(1)} customClose">
				<div class="pokeName">
					<div class="nameNumber">
						<h1>${namePopGer}</h1>
						<p>${poke_modal.id < 10 ? `#00${poke_modal.id}` : `${poke_modal.id}` < 100 ? `#0${poke_modal.id}` : `#${poke_modal.id}`}</p>
					</div>
					<div class="img-container">
						<img src="${img.src}" alt="${namePopGer}" />
					</div>
					${
						poke_modal.types.length == 2
							? `<div class="info">
									<p class="type">Typ: <span>${typ1}</span></p>
									<p class="type">Höhe: <span> ${height} m </span></p>
									<p class="type">Gewicht: <span> ${weight} Kg </span></p>
									<p class="type">Gattung: <span>${typ2}</span></p>
									<p class="type"><span>${textSpecies4}</span></p>
									
								</div>`
							: `
                   <div class="info">
										<p class="type">Typ: <span>${typ1}</span></p>
										<p class="type">Höhe: <span> ${height} m </span></p>
										<p class="type">Gewicht: <span> ${weight} Kg </span></p>
										<p class="type"><span>${textSpecies4}</span></p>
									</div>
                `
					}
				</div>
					<div class="about typedtext">
						<h2>Information</h2>
						<!--<p class="typing-demo">${textSpecies}</p>-->
						<p id="str"></p>
						<!--<p>${textSpecies3}</p>-->
					</div>
					<div class="stats">
						<div class="stats-block-hp">
						<h2>Statistiken</h2>
							<p>Gesundheitspunkte</p>
							<div class="progress">							
								<div class="progress-done-hp progress-done -${poke_modal.types[0].type.name[0].toUpperCase() + poke_modal.types[0].type.name.slice(1)}"><span id="value1">${statsHp}</span></div>
							</div>
						</div>
						<div class="stats-block-attack">
							<p>Angriff</p>							
							<div class="progress">							
								<div class="progress-done-attack progress-done -${poke_modal.types[0].type.name[0].toUpperCase() + poke_modal.types[0].type.name.slice(1)}" data-done="${statsAttack}"><span id="value2">${statsAttack}</span></div>
							</div>
						</div>
						<div class="stats-block-defense">
							<p>Verteidigung</p>							
							<div class="progress">
								<div class="progress-done-defense progress-done -${poke_modal.types[0].type.name[0].toUpperCase() + poke_modal.types[0].type.name.slice(1)}" data-done="${statsDefense}"><span id="value3">${statsDefense}</span></div>
							</div>
						</div>
						<div class="stats-block-speed">	
							<p>Geschwindigkeit</p>						
							<div class="progress">
								<div class="progress-done-speed progress-done -${poke_modal.types[0].type.name[0].toUpperCase() + poke_modal.types[0].type.name.slice(1)}" data-done="${statsSpeed}"><span id="value4">${statsSpeed}</span></div>
							</div>
						</div>
					</div>
				<div class="evolution"> ${evolutionHTML} </div>
			</div>
	
    `;

	modalBox.innerHTML = htmlString;

	function textTyping() {
		var str = string.split('');
		var el = document.getElementById('str');
		(function animate() {
			str.length > 0 ? (el.innerHTML += str.shift()) : clearTimeout(running);
			var running = setTimeout(animate, 58);
		})();
	}
	setTimeout(textTyping, 1500);

	const stats = document.querySelectorAll('.stats-num');

	function statHp() {
		var progress = document.querySelector('.progress-done-hp');

		progress.style.opacity = 1;
		progress.style.setProperty('--hp', statsHp + '%');

		let SPEED = 20;
		let limit = parseInt(document.getElementById('value1').innerHTML, 10);

		for (let i = 0; i <= limit; i++) {
			setTimeout(function () {
				document.getElementById('value1').innerHTML = i;
			}, SPEED * i);
		}
	}
	setTimeout(statHp, 100);

	function statAttack() {
		var progress = document.querySelector('.progress-done-attack');

		progress.style.opacity = 1;
		progress.style.setProperty('--attack', statsAttack + '%');

		let SPEED = 20;
		let limit = parseInt(document.getElementById('value2').innerHTML, 10);

		for (let i = 0; i <= limit; i++) {
			setTimeout(function () {
				document.getElementById('value2').innerHTML = i;
			}, SPEED * i);
		}
	}
	setTimeout(statAttack, 100);

	function statDefense() {
		var progress = document.querySelector('.progress-done-defense');

		progress.style.opacity = 1;
		progress.style.setProperty('--defense', statsDefense + '%');

		let SPEED = 20;
		let limit = parseInt(document.getElementById('value3').innerHTML, 10);

		for (let i = 0; i <= limit; i++) {
			setTimeout(function () {
				document.getElementById('value3').innerHTML = i;
			}, SPEED * i);
		}
	}
	setTimeout(statDefense, 100);

	function statSpeed() {
		var progress = document.querySelector('.progress-done-speed');

		progress.style.opacity = 1;
		progress.style.setProperty('--speed', statsSpeed + '%');

		let SPEED = 20;
		let limit = parseInt(document.getElementById('value4').innerHTML, 10);

		for (let i = 0; i <= limit; i++) {
			setTimeout(function () {
				document.getElementById('value4').innerHTML = i;
			}, SPEED * i);
		}
	}
	setTimeout(statSpeed, 100);
}

const close = document.getElementById('modal-name');

function closePopup() {
	window.speechSynthesis.cancel();
	close.style.display = 'none';
}
