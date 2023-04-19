package com.project.carpentryshop.Api.ProductsEndpoints;

import com.project.carpentryshop.Repo.ProductsRepo.ElementConstantRepo;
import com.project.carpentryshop.Repo.ProductsRepo.ElementLiquidRepo;
import com.project.carpentryshop.Repo.ProductsRepo.ProductRepo;
import com.project.carpentryshop.entity.Products.ElementConstant;
import com.project.carpentryshop.entity.Products.ElementLiquid;
import com.project.carpentryshop.entity.Products.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductApi {
    private final ProductRepo productRepo;
    private final ElementConstantRepo elementConstantRepo;
    private final ElementLiquidRepo elementLiquidRepo;

    @Autowired
    public ProductApi(@Qualifier("projectRepo") ProductRepo productRepo, ElementConstantRepo elementConstantRepo, ElementLiquidRepo elementLiquidRepo) {
        this.productRepo = productRepo;
        this.elementConstantRepo = elementConstantRepo;
        this.elementLiquidRepo = elementLiquidRepo;
    }

    @GetMapping("/all")
    public Iterable<Product> getAll() {
        return productRepo.findAll();
    }

    @GetMapping("/details/{id}")
    public Optional<Product> getById(@PathVariable("id") Long id) {
        return productRepo.findById(id);
    }

    @PostMapping("/status/{id}")
    public Product changeStatus(@PathVariable("id") Long id) {
        Product changeStatus = productRepo.findById(id).orElseThrow(RuntimeException::new);

        if (changeStatus.isProductStatus()) {
            changeStatus.setProductStatus(false);
            productRepo.save(changeStatus);
        } else {
            changeStatus.setProductStatus(true);
            productRepo.save(changeStatus);
        }
        return changeStatus;
    }

    @PutMapping("/modified")
    public ResponseEntity modifiedQuantity(@RequestParam("product") Long product,
                                           @RequestParam("type") String type,
                                           @RequestParam("operation") String operation,
                                           @RequestParam("quan") int quan) {

        if (type.equals("CONSTANT")) {
            ElementConstant constant = (ElementConstant) elementConstantRepo.findById(product).orElseThrow(RuntimeException::new);
            if (operation.equals("minus")) {
                constant.setQuantity((constant.getQuantity() - quan));
                elementConstantRepo.save(constant);
            }
            if (operation.equals("plus")) {
                constant.setQuantity((constant.getQuantity() + quan));
                elementConstantRepo.save(constant);
            }
        }

        if (type.equals("LIQUID")) {
            ElementLiquid liquid = (ElementLiquid) elementLiquidRepo.findById(product).orElseThrow(RuntimeException::new);
            if (operation.equals("minus")) {
                liquid.setQuantity((liquid.getQuantity() - quan));
                elementLiquidRepo.save(liquid);
            }
            if (operation.equals("plus")) {
                liquid.setQuantity((liquid.getQuantity() + quan));
                elementLiquidRepo.save(liquid);
            }
        }


        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/delivery")
    public void delivery(@RequestParam List<Long> product, @RequestParam List<Integer> quan, @RequestParam List<String> types) {


        int a = 0;
        for (Long i : product) {
            String way = types.get(a);
            if (way.equals("CONSTANT")) {
                ElementConstant find = (ElementConstant) elementConstantRepo.findById(product.get(a)).orElseThrow();
                find.setQuantity((find.getQuantity() + quan.get(a)));
                elementConstantRepo.save(find);
            } else {
                ElementLiquid find = (ElementLiquid) elementLiquidRepo.findById(product.get(a)).orElseThrow();
                find.setQuantity(find.getQuantity() + quan.get(a));
                elementConstantRepo.save(find);
            }

            a++;
        }


    }

}
