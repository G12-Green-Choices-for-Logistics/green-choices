import { useState } from 'react';
import RouteMap from '@/components/RouteMap';
import RouteSelector from '@/components/RouteSelector';
import RouteDetails from '@/components/RouteDetails';
import { Card } from '@/components/ui/Card';
import useRoutes from '../hooks/useRoutes';
import Comparision from '../components/Comparision';
import EmissionMeter from '../components/CarbonEmissionMeter';
// import EmissionMeter from '../components/EmissionsMeter';
import OrderSummary from '@/components/OrderSummary'; 
import CarbonModal from '../components/CarbonModal'; 
import { useLocation } from "react-router-dom";
import Header from "../components/Header";  
 
const Checkout = () => {
  const { routes, selectedRoute, setSelectedRoute, totalEmissions } = useRoutes();
  const [selectedModes, setSelectedModes] = useState([]); 
  const [showModal, setShowModal] = useState(false);
 
  const location = useLocation(); // Get location object
  const totalAmount = location.state?.totalAmount; // Retrieve total amount from state (optional chaining)
  
  return (
    <>
      <Header />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="h-[400px] bg-white/70 backdrop-blur-lg">
              <RouteMap route={selectedRoute} />
            </Card>

            {routes && (
              <Card className="p-6 bg-white/70 backdrop-blur-lg">
                <RouteSelector
                  routes={routes.routes}
                  selectedRoute={selectedRoute}
                  onRouteSelect={setSelectedRoute}
                />
              </Card>
            )}
            <div>
              {selectedRoute && (
                <div>
                  <RouteDetails
                    route={selectedRoute}
                    selectedModes={selectedModes}
                    setSelectedModes={setSelectedModes}
                  />
                </div>
              )}
            </div>

          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-white/70 backdrop-blur-lg"> 
              <Comparision  maxValue={500}/>
            </Card>
            <Card className="p-6 bg-white/70 backdrop-blur-lg">
              <EmissionMeter 
                currentValue={
                  totalEmissions?.find(e => e.name === selectedRoute?.routeNumber)?.minTotalEmissions || 0
                } maxValue={500}
                // maxValue={
                //   Math.max(...(totalEmissions?.map(e => e.maxTotalEmissions) || []))
                // }
                onEmissionsClick={() => setShowModal(true)}
              />
            </Card>
            
            <OrderSummary 
              selectedRoute={selectedRoute}
              selectedModes={selectedModes}
            />
          </div>
        </div>

        {showModal && (
          <CarbonModal showModal={showModal} setShowModal={setShowModal} />
        )}
      </main>
    </div>
    </>
  );
};

export default Checkout;
