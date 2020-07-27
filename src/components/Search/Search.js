import React, { useEffect, useState } from 'react';
import axios from 'axios';


import './Search.css';

const SearchComponent = props => {
    

    const [type, setType] = useState('planets');
    const [num, setNum] = useState(1);
    const [url, setUrl] = useState('https://swapi.dev/api/planets/1/');
    const [res, setRes] = useState('');
    const [html, setHtml] = useState('');
    const [fail, setFail] = useState('');
    const [img, setImg] = useState('');

    const failImgUrl = 'https://i.kym-cdn.com/photos/images/facebook/001/005/935/ef1.jpg';
    
    const mapResults = () => {
        let otherObj = {
            header1: 'h1',
            header2: 'h2',
            paragraph1: '1',
            paragraph2: '2',
            paragraph3: '3',
            paragraph4: '4',
            paragraph5: '5',
            paragraph6: '6',

        }
        if(type === 'people'){

            // async function abc(){
            //     const homeworld = await fetch(res.homeworld)
            //     return homeworld.json;
            // }

            // const stuff = abc();

            // const homeworld = axios.get(res.homeworld).then(response=> {
            //     console.log(response);
            //     return response.data.name;
            // })

            otherObj.header1 = res.name;
            otherObj.header2 = 'Homeworld: ' + res.homeworld;
            otherObj.header2 = <a href={res.homeworld}>Homeworld</a>;
            otherObj.paragraph1 = 'Gender: ' + res.gender;
            otherObj.paragraph2 = 'Height: ' + res.height;
            otherObj.paragraph3 = 'Weight: ' + res.mass;
            otherObj.paragraph4 = 'Hair: ' + res.hair_color;
            otherObj.paragraph5 = 'Films: ' + res.films;
            otherObj.paragraph6 = 'Vehicles: ' + res.vehicles;
        }
        if(type === 'planets'){
            otherObj.header1 = res.name;
            otherObj.header2 = 'Climate: ' + res.climate;
            otherObj.paragraph1 = 'Gravity: ' + res.gravity;
            otherObj.paragraph2 = 'Diameter: ' + res.diameter;
            otherObj.paragraph3 = 'Terrain: ' + res.terrain;
            otherObj.paragraph4 = 'Water: ' + res.surface_water;
            otherObj.paragraph5 = 'Residents: ' + res.residents;
            otherObj.paragraph6 = 'Orbital Period: ' + res.orbital_period;
        }
        if(type === 'starships'){
            otherObj.header1 = res.name;
            otherObj.header2 = 'Model: ' + res.model;
            otherObj.paragraph1 = 'Crew: ' + res.crew;
            otherObj.paragraph2 = 'Cargo Capacity: ' + res.cargo_capacity;
            otherObj.paragraph3 = 'MGLT: ' + res.mglt;
            otherObj.paragraph4 = 'Consumables: ' + res.consumables;
            otherObj.paragraph5 = 'Hyperdrive Rating: ' + res.hyperdrive_rating;
            otherObj.paragraph6 = 'Manufacturer: ' + res.manufacturer;
        }
        if(type === 'species'){
            otherObj.header1 = res.name;
            otherObj.header2 = 'Designation: ' + res.designation;
            otherObj.paragraph1 = 'Classification: ' + res.classification;
            otherObj.paragraph2 = 'Average Lifespan: ' + res.average_lifespan;
            otherObj.paragraph3 = 'Average Height: ' + res.average_height;
            otherObj.paragraph4 = 'Homeworld: ' + res.homeworld;
            otherObj.paragraph5 = 'Language: ' + res.language;
            otherObj.paragraph6 = 'Films: ' + res.films;
        }

        return (
            otherObj
        );
    }
    
    const renderObj = (thisObj) => {
        return (
            <>
            <h1><a href={thisObj.url}>{thisObj.header1}</a></h1>
                <h2>{thisObj.header2}</h2>
                <p>{thisObj.paragraph1}</p>
                <p>{thisObj.paragraph2}</p>
                <p>{thisObj.paragraph3}</p>
                <p>{thisObj.paragraph4}</p>
                <p>{thisObj.paragraph5}</p>
                <p>{thisObj.paragraph6}</p>
            </>
        );
    }

    const onClickHandler = e => {
        //first create URL from stateful variables
        setUrl('https://swapi.dev/api/' + type + '/' + num + '/');
        console.log(url);

        //next fetch our results
        const results = axios.get(url).then(response=> {
            console.log('URL: ' + url);
            console.log(response);
            setRes(response.data)
            setFail(false);
            return response.data;
        }).catch( response => {
            setFail(true);
            console.log('Failed: ' + fail)
            return 0;
        });
        
        
        
        //lastly return HTML with our results!
        if(!fail){
            setHtml(renderObj(mapResults()));
        }
        
        return results.data;
    }
    const failHandler = () => {
        if(fail === true){
            setImg(<img src={failImgUrl} alt="Not the Droids"></img>);
            setHtml('');
        }
        else {
            setImg('');
        }
    }

    useEffect(() => {
        setUrl('https://swapi.dev/api/' + type + '/' + num + '/');
    }, [type, num]);
    useEffect(() => {
        setHtml(renderObj(mapResults()))
    },[res]);
    useEffect(() => {
        failHandler();
    },[fail]);
    useEffect(() => {
        setHtml('');
    },[])

    return (
        <div className='SearchComponent'>
            <h1>Search The Star Wars API</h1>
            <br />
            <div className='searchbar'>
                <label htmlFor='type'>Select Type</label>
                <select placeholder="planets" onChange={e => setType(e.target.value)} id='type' name="Type">
                    <option value="planets">Planets</option>
                    <option value="starships">Starships</option>
                    <option value="people">People</option>
                    <option value="species">Species</option>
                </select>

                <label htmlFor='num'>Select Number</label>
                <input onChange={e => setNum(e.target.value)} value={num} min='1' max='100' id="num" type="number" placeholder='1'></input>

                <button onClick = { onClickHandler } className = "button">
                    <p className="buttonLink">Search!</p>
                    
                </button>
            </div>

            <div className="results">
                {img}
                {html}
            </div>

            {props.children}
        </div>

    )
}

export default SearchComponent;