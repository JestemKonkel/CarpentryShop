package com.project.carpentryshop.Api.ProductsEndpoints;

import com.project.carpentryshop.Repo.ProductsRepo.ProjectRepo;
import com.project.carpentryshop.entity.Products.Project;
import com.project.carpentryshop.entity.ProductsCategory.ProjectCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectApi {
    private final ProjectRepo projectRepo;


    @Autowired
    public ProjectApi(ProjectRepo projectRepo) {
        this.projectRepo = projectRepo;

    }

    @PostMapping(value = "/addProject")
    public Project addProject(@RequestBody Project project) {

        return projectRepo.save(project);
    }

    @GetMapping("/category")
    public ProjectCategory[] getCategory() {
        return ProjectCategory.values();
    }

    @PutMapping("details/update/project/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project project) {

        Project updateProduct = (Project) projectRepo.findById(id).orElseThrow(RuntimeException::new);
        updateProduct.setName(project.getName());
        updateProduct.setBasePrice(project.getBasePrice());
        updateProduct.setFurnitureCategory(project.getFurnitureCategory());
        updateProduct.setDescription(project.getDescription());
        updateProduct.setWeight(project.getWeight());

        return projectRepo.save(updateProduct);
    }


}
