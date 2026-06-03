// TRY CATCH LOCAL STORAGE
const saveProjectsToStorage = (updatedProjects) => {
  try {
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    return true;
  } catch (error) {
    console.error("Failed to save data. Local storage might be full:", error);
    alert("Your storage is full! Some changes might not be saved.");
    return false;
  }
};

export { saveProjectsToStorage };
