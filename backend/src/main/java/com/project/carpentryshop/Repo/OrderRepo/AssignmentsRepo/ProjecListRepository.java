package com.project.carpentryshop.Repo.OrderRepo.AssignmentsRepo;

import com.project.carpentryshop.entity.Order.Assigments.Assigment;
import com.project.carpentryshop.entity.Order.Assigments.ProjectList;
import com.project.carpentryshop.entity.Products.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjecListRepository extends CrudRepository<ProjectList, Long> {
    boolean existsByProjectAndAssigment(Project exist, Assigment a);

    ProjectList findByProject_IdAndAssigment(Long id, Assigment lastAssigment);

    ProjectList findTopByOrderByAssigmentDesc();

    List<ProjectList> findByAssigment(Assigment last);
}
