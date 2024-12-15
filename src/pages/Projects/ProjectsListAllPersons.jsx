import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import getPerson from "../../components/RequireIdentify";
import { projectsallpersons } from "../../Services/Fetch";
import CardProject from "../../components/Projects/CardProjectAllPersons";

const ProjectsList = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  const loadUser = async () => {
    const person = await getPerson(auth.username);
    setUser(person ?? null);
  };

  const loadProjects = async () => {
    try {
      const res = await fetch(projectsallpersons);
  
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
  
      const data = await res.json();
      console.log(data.projects); 
      setProjects(data.projects); 
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, [auth.username]);

  useEffect(() => {
    if (user) {
      loadProjects();
      console.log("Projects loaded");
      // TODO: implementar filtro de proyectos por persona
      console.log( projects);
    }
  }, [user]);
  return (
  <>
      <CardProject
        projects={projects}
        navigate={navigate}
      />
    </>
  );
};

export default ProjectsList;
