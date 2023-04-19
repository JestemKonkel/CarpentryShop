package com.project.carpentryshop.Repo.JobsComplementingRepo;

import com.project.carpentryshop.entity.Order.Assigments.ProjectList;
import com.project.carpentryshop.entity.JobComplementing.Resources;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourcesRepository extends CrudRepository<Resources, Long> {
    boolean existsByProductIdAndAssigmentIdAndProjectList(Long product, Long assigment, ProjectList projectList);

    Resources findByProductIdAndAssigmentIdAndProjectList(Long product, Long assigment, ProjectList projectList);

    Iterable<Resources> findByAssigmentId(Long id);
}
