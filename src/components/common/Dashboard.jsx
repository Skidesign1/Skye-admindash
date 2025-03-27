import React, { useState, useEffect } from 'react';
const Dashboard = () => {
    const [partners, setPartners] = useState([]);
    const [creatives, setCreatives] = useState([]);
    const [name, setName] = useState('');
    const [creativeName, setCreativeName] = useState('');
    const [creativeEmail, setCreativeEmail] = useState('');
    const [password, setPassword] = useState('');
    const [capabilities, setCapabilities] = useState('');
    const [skills, setSkills] = useState('');

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
    const handleCreateCreative = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/admin/create-creative', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ creativeName, creativeEmail, skills, password }),
            });
    
            // if (!response.ok) throw new Error("Failed to create partner");
    
            const data = await response.json();
            console.log("New Partner Created:", data);
    
    
    
        } catch (error) {

            console.error("Error:", error.message);
        }
    };


    useEffect(() => {
        // const token = localStorage.getItem('token');
        // if (!token) {
        //   console.error("No token found in localStorage.");
        //   return;
        // }
      
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/admin/partners', {
              method: 'GET',
              headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            const data = await response.json();

            setPartners(data)

            const creativeResponse = await fetch('http://localhost:5000/api/admin/creatives', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const creativeData = await creativeResponse.json();

            setCreatives(creativeData)


 
          } catch (error) {
            console.error("Error fetching data:", error.message);
          } finally {
          }
        };
      
        // Fetch data initially and then at regular intervals
        fetchData();
        const interval = setInterval(fetchData, 1000); 
      
        return () => clearInterval(interval);
    }, []);

    return(
        <div className="dashboard-container border border-white flex ">
            <div>
                <h1 className="text-3x1">
                    <h3 style={{fontSize: '15px'}}>PARTNERS</h3>

                    {
                        partners.map((partner, index)=> (
                            <div key={index} className='text-left border border-white'>
                                <h1 style={{fontSize: '14px'}}>{partner.name}</h1>
                                <h2 style={{fontSize: '14px'}}>{partner.email}</h2>
                                <p style={{fontSize: '14px'}}>{partner.capabilities}</p>
                            </div>
                        ))
                    }
                    
                </h1>
                <form style={{height: '200px'}} onSubmit={handleCreatePartner}>
                    <h1 style={{fontSize: '17px'}}>Create Partner</h1>
                    <div className='flex flex-col text-black text-left'>
                        <>
                            <p style={{fontSize: '14px', color: 'white'}}>Label</p>
                            <input style={{fontSize: '14px'}} name="name" type="text" placeholder="name" onChange={(e)=>setName(e.target.value)}/>

                        </>
                        <>
                            <p style={{fontSize: '14px', color: 'white'}}>Email</p>
                            <input style={{fontSize: '14px'}} name="email" type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>

                        </>
                        <>
                            <p style={{fontSize: '14px', color: 'white'}}>Capabilities</p>
                            <input style={{fontSize: '14px'}} name="capabilities" type="text" placeholder="capabilities" onChange={(e)=>setCapabilities(e.target.value)}/>

                        </>
                        <>
                            <p style={{fontSize: '14px', color: 'white'}}>Password</p>
                            <input style={{fontSize: '14px'}} name="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>

                        </>
                        <><button className='bg-white' type='submit'>Create</button></> 
                    </div>
                </form>
            </div>
            <div>
            <h1 className="text-3x1">
                    <h3 style={{fontSize: '15px'}}>CREATIVES</h3>

                    {
                        creatives.map((creative, index)=> (
                            <div key={index} className='text-left border border-white'>
                                <h1 style={{fontSize: '14px'}}>{creative.name}</h1>
                                <h2 style={{fontSize: '14px'}}>{creative.email}</h2>
                                <p style={{fontSize: '14px'}}>{creative.skills}</p>
                            </div>
                        ))
                    }
                    
                </h1>
                <form style={{height: '200px'}} onSubmit={handleCreateCreative}>
                    <h1 style={{fontSize: '17px'}}>Create Creative</h1>
                    <div className='flex flex-col text-black text-left'>
                        <>
                            <p style={{fontSize: '14px', color: 'white'}}>Name</p>
                            <input style={{fontSize: '14px'}} name="name" type="text" placeholder="name" onChange={(e)=>setCreativeName(e.target.value)}/>

                        </>
                        <>
                            <p style={{fontSize: '14px', color: 'white'}}>Email</p>
                            <input style={{fontSize: '14px'}} name="email" type="text" placeholder="email" onChange={(e)=>setCreativeEmail(e.target.value)}/>

                        </>
                        <>
                            <p style={{fontSize: '14px', color: 'white'}}>Skills</p>
                            <input style={{fontSize: '14px'}} name="capabilities" type="text" placeholder="capabilities" onChange={(e)=>setSkills(e.target.value)}/>

                        </>
                        {/* <>
                            <p style={{fontSize: '14px', color: 'white'}}>Password</p>
                            <input style={{fontSize: '14px'}} name="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>

                        </> */}
                        <><button className='bg-white' type='submit'>Create</button></> 
                    </div>
                </form>
            </div>

        </div>
    );
};
export default Dashboard;