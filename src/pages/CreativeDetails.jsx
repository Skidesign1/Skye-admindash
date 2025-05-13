import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CreativeDetails = () => {
  const { creativeId } = useParams();
  const [creative, setCreative] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/creative/${creativeId}`);
        const data = await response.json();
        setCreative(data);
        console.log(data);
        
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchDetails();
  }, [creativeId]);

  if (!creative) return <div>Loading...</div>;

  return (
    <div className="p-6 w-[50%] mx-auto space-y-4 rounded-lg bg-[#56778] border text-black">
      <h2 className="text-xl font-bold mb-2">{creative.fullName.toUpperCase()}'s Profile</h2>
      <p>Email: {creative.email}</p>
      <p>Country: {creative.country}</p>
      <p>Created: {new Date(creative.createdAt).toLocaleDateString()}</p>

    </div>
  );
};

export default CreativeDetails;
