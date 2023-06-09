package com.project.carpentryshop.Repo.OrderRepo.AssignmentsRepo;

import com.project.carpentryshop.entity.Order.Assigments.Assigment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssigmentRepository extends CrudRepository<Assigment, Long> {
    Assigment findTopByOrderByIdDesc();

    Assigment findTopById(Long lastId);

    Assigment findByInCart(boolean b);
}
