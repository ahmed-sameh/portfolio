let projectsList = [
  {
    projectName: 'Elzero Template',
    projectUrl:'https://ahmed-sameh.github.io/elzero-temp/',
    projectGithub:'https://github.com/ahmed-sameh/elzero-temp',
    projectImage: './images/elzero-poster.png',
    projectView: './images/elzero-page-preview.png'
  },
  {
    projectName: 'Recipes Book',
    projectUrl:'https://ng-recipes-7b90f.web.app/auth',
    projectGithub:'https://github.com/ahmed-sameh/ng-recipes-book',
    projectImage: './images/ng-recipes-poster.png',
    projectView: './images/ng-recipes-poster.png'
  },
  {
    projectName: 'JS Recipe',
    projectUrl:'https://ahmed-sameh.github.io/js-recipe-app/',
    projectGithub:'https://github.com/ahmed-sameh/js-recipe-app',
    projectImage: './images/js-recipe-poster.png',
    projectView: './images/js-recipe-preview.png'
  }
];

class projectRender
{
  constructor()
  {
    this.projectsList = projectsList;
    this.projectsRender();
    this.projectClickHandler();
  }
  
  projectRenderHandler(project) // this function responsible to create single project box 
  {
    const projectBox = document.createElement('div');
    projectBox.className = 'box';
    projectBox.title = `${project.projectName}`;
    projectBox.innerHTML = `
    <div class="image">
      <img src="${project.projectImage}" alt="${project.projectName}">
    </div>
    <h3 class="project-name">${project.projectName} <i class="fas fa-binoculars"></i></h3>
    `
    return projectBox
  }

  projectsContainer = document.querySelector('#portfolio .projects-box');

// this function responsible to send project object to projectRenderHandler function and get back the html box and append it to projects container
  projectsRender()  
  {
    for (const project of this.projectsList) {
      const projectItem = this.projectRenderHandler(project);
      projectItem.dataset.projectId = projectsList.indexOf(project);
      this.projectsContainer.append(projectItem);
    }
  }


// this function is responsible of listen to click event and send project id to projectView function
  projectClickHandler()
  {
    this.projectsContainer.addEventListener('click', event => {
      const selectedProject = event.target.closest('.box');
      if(selectedProject)
      {
        this.projectView(selectedProject.dataset.projectId);
        this.projectNavigationHandler(selectedProject.dataset.projectId);
      }
    })
  }
  
  // this function get project id and go to projects array and get selected project  and send it to projectPreviewerHandler function
  projectView(projectId)
  {
    const SelectedProjectItem = this.projectsList[projectId];
    this.projectPreviewerHandler(SelectedProjectItem);
  }
  
  // this function take the project selected and start to preview it to user 
  projectPreviewerHandler(project)
  {
    const projectPreviewer = document.getElementById('pagePreview');
    const ProjectImageElement = projectPreviewer.querySelector('img');
    const projectNameHeader = document.getElementById('project-name');
    const tryButton = document.getElementById('try-site-btn');
    const githubButton = document.getElementById('git-btn');


    projectPreviewer.classList.add('visible');
    document.body.classList.add('noScroll');
    projectNameHeader.innerText = project.projectName;
    tryButton.href = project.projectUrl;
    githubButton.href = project.projectGithub;
    ProjectImageElement.src = project.projectView;

    const closeImageHandler = event => {
        projectPreviewer.classList.remove('visible');
        document.body.classList.remove('noScroll');
    }
    
    
    projectPreviewer.addEventListener('click', closeImageHandler);
    ProjectImageElement.addEventListener('click', (event) => {event.stopPropagation()});
    tryButton.addEventListener('click', (event) => {event.stopPropagation()});
    githubButton.addEventListener('click', (event) => {event.stopPropagation()});
  }





// this function take current project index and start to handle navigation to next ot prev project
  projectNavigationHandler(currentProjectId)
  {
    const nextProjectBtn = document.getElementById('next-project-btn');
    const prevProjectBtn = document.getElementById('prev-project-btn');
    let currentProjectIndex = +currentProjectId;

    const goToNextProject = () => {
      if (currentProjectIndex >= projectsList.length - 1) {
        currentProjectIndex = 0;
        this.projectView(currentProjectIndex);
        return;
      }
      this.projectView(currentProjectIndex + 1);
      currentProjectIndex++;
    }

    const goToPrevProject = () => {
      if (currentProjectIndex < 1) {
        currentProjectIndex = projectsList.length - 1;
        this.projectView(currentProjectIndex);
        return;
      }
      this.projectView(currentProjectIndex - 1);
      currentProjectIndex--;
    }

    nextProjectBtn.addEventListener('click', event => {
      event.stopPropagation();
      goToNextProject();
    })

    prevProjectBtn.addEventListener('click', event => {
      event.stopPropagation();
      goToPrevProject();
    })
  
  }
  
}




// scroll to top button
window.onscroll = () => {
  const toTopBtn = document.getElementById('scroll-to-top');
  if(window.scrollY >= 800)
  {
    toTopBtn.classList.add('visible')
  }else {
    toTopBtn.classList.remove('visible')
  }
}







new projectRender();