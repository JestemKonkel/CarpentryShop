package com.project.carpentryshop.Repo.ProductsRepo;

import com.project.carpentryshop.entity.Products.Product;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepo extends ProductRepo {
Optional<Product> findById(Long id);
}
