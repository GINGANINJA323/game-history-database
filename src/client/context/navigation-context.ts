import { createContext } from "react";
import { NavigationContextType } from "../types";

const NavigationContext = createContext<NavigationContextType | null>(null);

export default NavigationContext;