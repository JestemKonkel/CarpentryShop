package com.project.carpentryshop.Repo.ProductsRepo;


import com.project.carpentryshop.entity.Products.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface ProductRepo extends CrudRepository<Product, Long> {
    Product findTopByOrderByIdDesc();


}
