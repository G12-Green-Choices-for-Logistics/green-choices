import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import { TransportProvider } from '@/context/transport-context';
import Cart from "./pages/cart";

const App = () => (
  <TooltipProvider>
    <TransportProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TransportProvider>
  </TooltipProvider>
);

export default App;
