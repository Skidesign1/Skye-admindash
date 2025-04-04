import React, { useState, useEffect } from 'react';
import PartnerBlockToggle from "../PartnerBlockToggle"
import CreativeBlockToggle from '../CreativeBlockToggle';
import ClientBlockToggle from '../ClientBlockToggle';
const Dashboard = () => {
    const [partners, setPartners] = useState([]);
    const [creatives, setCreatives] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [clients, setClients] = useState([]);
    const [creativeName, setCreativeName] = useState('');
    const [creativeEmail, setCreativeEmail] = useState('');
    const [skills, setSkills] = useState('');
    const [password, setPassword] = useState('');
    const [capabilities, setCapabilities] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);


    const handleCreatePartner = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/admin/create-partner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, capabilities, password }),
            });
    
            // if (!response.ok) throw new Error("Failed to create partner");
    
            const data = await response.json();
            console.log("New Partner Created:", data);   
    
    
        } catch (error) {

            console.error("Error:", error.message);
        }
    };
    const deleteCreative = async (creativeId, e)=> {
        if (e) e.preventDefault(); // ✅ Only call preventDefault() if e exists

        console.log(creativeId);
        

        try {
            const response = await fetch(`http://localhost:5000/api/admin/delete-creative/${creativeId}`, {
                method: 'DELETE',

            });
            const data = await response.json()

            console.log(data);
            
            setCreatives((prevCreativeList) => prevCreativeList.filter(create => create._id !== creativeId));
        } catch (error) {
            console.log('error', error.message);
            
            
        }

    }
    const deletePartner = async (partnerId, e)=> {
        if (e) e.preventDefault(); // ✅ Only call preventDefault() if e exists

        console.log(partnerId);
        

        try {
            const response = await fetch(`http://localhost:5000/api/admin/delete-partner/${partnerId}`, {
                method: 'DELETE',

            });
            const data = await response.json()

            console.log(data);
            
            setPartners((prevPartnerList) => prevPartnerList.filter(part => part._id !== partnerId));
        } catch (error) {
            console.log('error', error.message);
            
            
        }

    }


    const handleCreateCreative = async (e) => {
        e.preventDefault();
    
        // Convert skills string into an array
        const skillsArray = skills.split(",").map(skill => skill.trim());
    
        console.log("Submitting:", { 
            creativeName, 
            creativeEmail, 
            skills: skillsArray // Log this to confirm it's an array
        });
    
        try {
            const response = await fetch('http://localhost:5000/api/admin/create-creative', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ creativeName, creativeEmail, skills: skillsArray }), // Send as array
            });
    
            const data = await response.json();
            console.log("New Creative Created:", data);
    
        } catch (error) {
            console.error("Error:", error.message);
        }
    };
    




    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch partners
                const response = await fetch('http://localhost:5000/api/admin/partners', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                const partnersData = await response.json();
                setPartners(partnersData);

    
                // Fetch creatives
                const creativeResponse = await fetch('http://localhost:5000/api/admin/creatives', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
    
                const creativeData = await creativeResponse.json();
                setCreatives(creativeData);
    
    
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };
    
        fetchData();
    
        // Optional: Polling every 10 seconds instead of 1s to avoid high server load
        const interval = setInterval(fetchData, 10000);
    
        return () => clearInterval(interval);
    }, []);
    

    return(
        <div className="dashboard-container border border-white flex gap-4 ">
            <div className='flex'>
                <h1 className="text-3x1">
                    <h3 style={{fontSize: '15px'}}>PARTNERS</h3>

                    {
                        partners.map((partner, index)=> (
                            <div key={index} className='text-left border border-white'>
                                <h1 style={{fontSize: '14px'}}>{partner.name}</h1>
                                <h2 style={{fontSize: '14px'}}>{partner.email}</h2>
                                <p style={{fontSize: '14px'}}>{partner.capabilities}</p>
                                <PartnerBlockToggle 
                                    partnerId={partner._id} 
                                    isBlockedInitially={partner.isBlocked} // ✅ Ensure this is passed correctly
                                />
                                <button style={{ fontSize: "14px" }} onClick={()=> deletePartner(partner._id)}>Delete</button>
                                <h6 style={{fontSize: '14px'}}>Clients:</h6>
                                {
                                partner.clients.map((client) => (
                                    <div key={client._id} className="client">
                                        <p style={{fontSize: '14px'}}>Email: {client.clientName}</p>
                                        <p style={{fontSize: '14px'}}>Phone: {client.businessName}</p>
                                        <ClientBlockToggle 
                                            clientId={client._id} 
                                            isBlockedInitially={client.isBlocked} // ✅ Ensure this is passed correctly
                                        />
                                    </div>
                                ))
                                
                                }

                               
                               
                            </div>
                        ))
                    }
                    
                    
                </h1>
                <form style={{height: '200px'}} onSubmit={handleCreatePartner}>
                    <h1 style={{fontSize: '17px'}}>Create Partner</h1>
                    <div className='flex flex-col text-left text-white'>
                        <>
                            <p style={{fontSize: '14px'}}>Name</p>
                            <input style={{fontSize: '14px', color: 'black'}} name="name" type="text" placeholder="name" onChange={(e)=>setName(e.target.value)}/>

                        </>
                        <>
                            <p style={{fontSize: '14px'}}>Email</p>
                            <input style={{fontSize: '14px', color: 'black'}} name="email" type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>

                        </>
                        <>
                            <p style={{fontSize: '14px'}}>Capabilities</p>
                            <input style={{fontSize: '14px', color: 'black'}} name="capabilities" type="text" placeholder="capabilities" onChange={(e)=>setCapabilities(e.target.value)}/>

                        </>
                        <>
                            <p style={{fontSize: '14px'}}>Password</p>
                            <input style={{fontSize: '14px', color: 'black'}} name="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>

                        </>
                        <><button style={{fontSize: '14px'}} className='bg-white mt-4 text-black' type='submit'>Create</button></> 
                    </div>
                </form>
            </div>
            <div>
                <h1 className="text-3x1">
                    <h3 style={{fontSize: '15px'}}>CREATIVES</h3>

                    {
                        creatives.map((creative, index) => (
                            <div key={index} className="text-left border border-white">
                            <h1 style={{ fontSize: "14px" }}>{creative.creativeName}</h1>  {/* Change from creativeName */}
                            <h2 style={{ fontSize: "14px" }}>{creative.creativeEmail}</h2>  {/* Change from creativeEmail */}
                            <p style={{ fontSize: "14px" }}>{creative.skills.join(", ")}</p>  
                            <CreativeBlockToggle 
                                creativeId={creative._id} 
                                isBlockedInitially={creative.isBlocked} 
                            />
                            <button style={{ fontSize: "14px" }} onClick={()=> deleteCreative(creative._id)}>Delete</button>
                            </div>
                        ))
                    }
                    
                </h1>
                <form onSubmit={handleCreateCreative} className='flex flex-col text-white text-left'>

                <h1 style={{fontSize: '17px'}}>Create Creative</h1>

                    <label style={{ fontSize: '14px' }}>Name</label>
                    <input
                        style={{ fontSize: '14px', color: 'black' }}
                        name="creativeName"
                        type="text"
                        placeholder="Name"
                        value={creativeName} // Bind input to state
                        onChange={(e) => setCreativeName(e.target.value)}
                        required
                    />

                    <label style={{ fontSize: '14px' }}>Email</label>
                    <input
                        style={{ fontSize: '14px', color: 'black' }}
                        name="creativeEmail"
                        type="email"
                        placeholder="Email"
                        value={creativeEmail}
                        onChange={(e) => setCreativeEmail(e.target.value)}
                        required
                    />

                    <label style={{ fontSize: '14px' }}>Skills</label>
                    <input 
                        style={{fontSize: '14px', color: 'black'}} 
                        name="skills" 
                        type="text" 
                        placeholder="skills (comma-separated)" 
                        onChange={(e) => setSkills(e.target.value)}
                    />

                    <button
                        style={{ fontSize: '14px' }}
                        className='bg-white mt-4 text-black'
                        type='submit'
                    >
                        Create
                    </button>
                </form>
            </div>

        </div>
    );
};
export default Dashboard;