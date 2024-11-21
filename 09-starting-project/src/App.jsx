import ProjectsSidebar from "./component/ProjectsSidebar.jsx";
import NoProjectSelected from "./component/NoProjectSelected.jsx";
import {useState} from "react";
import NewProject from "./component/NewProject.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: []
    });

    function handleStartAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null,
            };
        });
    }

    let content;

    if(projectsState.selectedProjectId === null) {
        content = <NewProject />
    } else if(projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
    }

    return (
    <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar onStartAddProject={handleStartAddProject} />
        {content}
    </main>
    );
}

export default App;
