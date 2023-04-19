package com.project.carpentryshop.Repo.OrderRepo.AssignmentsRepo.ItemsRepo;

import com.project.carpentryshop.entity.Order.Items.Items;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemsRepository extends CrudRepository<Items, Long> {
    Items findTopById(Long id);
    Items findTopByOrderByIdDesc();

    Items findByIsActive(boolean isActive);
}
