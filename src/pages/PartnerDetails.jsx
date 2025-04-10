import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientBlockToggle from '../components/ClientBlockToggle';

const PartnerDetails = () => {
  const { partnerId } = useParams();
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/partner/${partnerId}`);
        const data = await response.json();
        setPartner(data);
        console.log(data);
        
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchDetails();
  }, [partnerId]);

  if (!partner) return <div>Loading...</div>;

  return (
    <div className="p-6 w-[50%] mx-auto space-y-4 rounded-lg bg-[#56778] border text-black">
      <h2 className="text-xl font-bold mb-2">{partner.name.toUpperCase()}'s Profile</h2>
      <p>Email: {partner.email}</p>
      <p>Created: {new Date(partner.createdAt).toLocaleDateString()}</p>

      <h3 className="text-lg font-semibold mt-6">Clients</h3>
      {partner.clients?.length > 0 ? (
        <ul className="list-disc ml-6">
          {partner.clients.map((client) => (
            <li key={client._id} className="mb-2">
              <p>Name: {client.clientName}</p>
              <p>Business: {client.businessName}</p>
              <p>Business PhoneNumber: {client.businessPhoneNumber}</p>
              <p>Description: {client.businessDescription}</p>

              <ClientBlockToggle 
                    clientId={client._id} 
                    isBlockedInitially={client.isBlocked}
                />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No clients under this partner yet.</p>
      )}
    </div>
  );
};

export default PartnerDetails;
