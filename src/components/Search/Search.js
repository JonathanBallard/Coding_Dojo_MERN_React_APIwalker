import React, { useEffect, useState } from 'react';
import axios from 'axios';


import './Search.css';

const SearchComponent = props => {
    

    const [type, setType] = useState('planets');
    const [num, setNum] = useState(1);
    const [url, setUrl] = useState('https://swapi.dev/api/planets/1/');
    const [res, setRes] = useState('');
    const [obj, setObj] = useState({});
    const [html, setHtml] = useState('');

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
        if(type == 'people'){
            otherObj.header1 = res.name;
            otherObj.header2 = 'Homeworld: ' + res.homeworld;
            otherObj.paragraph1 = 'Gender: ' + res.gender;
            otherObj.paragraph2 = 'Height: ' + res.height;
            otherObj.paragraph3 = 'Weight: ' + res.mass;
            otherObj.paragraph4 = 'Hair: ' + res.hair_color;
            otherObj.paragraph5 = 'Films: ' + res.films;
            otherObj.paragraph6 = 'Vehicles: ' + res.vehicles;
        }
        if(type == 'planets'){
            otherObj.header1 = res.name;
            otherObj.header2 = 'Climate: ' + res.climate;
            otherObj.paragraph1 = 'Gravity: ' + res.gravity;
            otherObj.paragraph2 = 'Diameter: ' + res.diameter;
            otherObj.paragraph3 = 'Terrain: ' + res.terrain;
            otherObj.paragraph4 = 'Water: ' + res.surface_water;
            otherObj.paragraph5 = 'Residents: ' + res.residents;
            otherObj.paragraph6 = 'Orbital Period: ' + res.orbital_period;
        }
        if(type == 'starships'){
            otherObj.header1 = res.name;
            otherObj.header2 = 'Model: ' + res.model;
            otherObj.paragraph1 = 'Crew: ' + res.crew;
            otherObj.paragraph2 = 'Cargo Capacity: ' + res.cargo_capacity;
            otherObj.paragraph3 = 'MGLT: ' + res.mglt;
            otherObj.paragraph4 = 'Consumables: ' + res.consumables;
            otherObj.paragraph5 = 'Hyperdrive Rating: ' + res.hyperdrive_rating;
            otherObj.paragraph6 = 'Manufacturer: ' + res.manufacturer;
        }
        if(type == 'species'){
            otherObj.header1 = res.name;
            otherObj.header2 = 'Designation: ' + res.designation;
            otherObj.paragraph1 = 'Classification: ' + res.classification;
            otherObj.paragraph2 = 'Average Lifespan: ' + res.average_lifespan;
            otherObj.paragraph3 = 'Average Height: ' + res.average_height;
            otherObj.paragraph4 = 'Homeworld: ' + res.homeworld;
            otherObj.paragraph5 = 'Language: ' + res.language;
            otherObj.paragraph6 = 'Films: ' + res.films;
        }
        if(type == 'vehicles'){

        }
        if(type == 'films'){

        }

        setObj(otherObj);
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

        console.log('---------');
        console.log(url);
        console.log('---------');

        //next fetch our results
        const results = axios.get(url).then(response=> {
            console.log('URL: ' + url);
            console.log(response);
            setRes(response.data)
            return response.data;
        });
        
        
        //lastly return HTML with our results!
        setHtml(renderObj(mapResults()));
        return results.data;
    }
    // useEffect(mapResults,[]);
    useEffect(() => {
        setUrl('https://swapi.dev/api/' + type + '/' + num + '/');
    });
    // useEffect(() => {
    //     setHtml(renderObj(mapResults()))
    // })


    return (
        <div className='SearchComponent'>
            <h1>Search The Star Wars API</h1>
            <br />
            <div className='searchbar'>
                <label htmlFor='type'>Select Type</label>
                <select placeholder="planets" onChange={e => setType(e.target.value)} id='type' name="Type">
                    <option value="planets">Planets</option>
                    <option value="starships">Starships</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="people">People</option>
                    <option value="films">Films</option>
                    <option value="species">Species</option>
                </select>

                <label htmlFor='num'>Select Number</label>
                <input onChange={e => setNum(e.target.value)} min='1' max='50' id="num" type="number" placeholder='1'></input>

                <button onClick = { onClickHandler } className = "button">
                    <a className="buttonLink">Search!</a>
                    
                
                </button>
            </div>

            <div className="results">
                {html}
            </div>

            {props.children}
        </div>

    )
}

export default SearchComponent;