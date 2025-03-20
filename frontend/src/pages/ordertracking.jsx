import { Card } from "@/components/ui/Card";
import RouteMap from "@/components/RouteMap";
import useRoutes from '../hooks/useRoutes';
import TrackingDetails from "@/components/TrackingDetails";
import RouteSelector from "../components/RouteSelector";
import RouteDetails from "@/components/RouteDetails";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import Header from "../components/Header";  

export default function OrderTrackingPage() {
  const [clicked, setClicked] = useState(false);
  const { routes, selectedRoute, setSelectedRoute, totalEmissions, greenestRoute, isLoading } = useRoutes();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!selectedRoute) {
    return <div>No route selected</div>;
  }

  return (
    <>
    <Header />
    <div className="mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="w-full lg:w-[25%]">
          <TrackingDetails selectedRoute={selectedRoute} isLoading={isLoading} />
        </div>
        <div className="w-full lg:w-[75%]">
          <Card className="h-[300px] md:h-[400px] bg-white/70 backdrop-blur-lg">
            <RouteMap route={selectedRoute} />
          </Card>
          <div className="flex justify-center mt-4 md:mt-6">
            <Button
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-lg font-semibold w-full md:w-auto"
              onClick={() => setClicked(!clicked)}
            >
              {!clicked ? "Change Route" : "Cancel Change"}
            </Button>
          </div>
          {clicked && (
            <div className="mt-4 md:mt-6 space-y-6">
              <div className="">
                <RouteSelector
                  routes={routes.routes}
                  selectedRoute={selectedRoute}
                  onRouteSelect={setSelectedRoute}
                />
              </div>
              <RouteDetails route={selectedRoute} 
                    greenestRoute={greenestRoute}/>
              <div className="flex flex-col md:flex-row justify-end gap-4 md:gap-6">
                <Button
                  variant="outline"
                  className="w-full md:w-auto px-6 py-2 text-lg font-semibold"
                  onClick={() => setClicked(!clicked)}
                >
                  Close
                </Button>
                <Button
                  className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-lg font-semibold"
                  onClick={() => setClicked(!clicked)}
                >
                  Update
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};


