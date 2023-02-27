import { useContext } from "react";
import ProyectoContext from "../context/ProyectoProvider";

export const useProyectos = () => {
    return useContext(ProyectoContext)
}