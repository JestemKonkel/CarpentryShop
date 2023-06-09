package com.project.carpentryshop.Api.ProductsEndpoints;

import com.project.carpentryshop.Repo.ProductsRepo.ElementLiquidRepo;
import com.project.carpentryshop.entity.Products.ElementLiquid;
import com.project.carpentryshop.entity.ProductsCategory.LiquidCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/liquid")
@CrossOrigin
public class LiquidApi {

    private final ElementLiquidRepo elementLiquidRepo;

    @Autowired
    public LiquidApi(ElementLiquidRepo elementLiquidRepo) {
        this.elementLiquidRepo = elementLiquidRepo;
    }

    @GetMapping("/category")
    public LiquidCategory[] getCategoryThird() {
        return LiquidCategory.values();
    }

    @PostMapping("/addLiquid")
    public ElementLiquid addLiquid(@RequestBody ElementLiquid elementLiquid) {
        return elementLiquidRepo.save(elementLiquid);
    }

    @PutMapping("details/update/liquid/{id}")
    public ElementLiquid updateConstant(@PathVariable Long id, @RequestBody ElementLiquid liquid) {

        ElementLiquid updateProduct = (ElementLiquid) elementLiquidRepo.findById(id).orElseThrow(RuntimeException::new);
        updateProduct.setName(liquid.getName());
        updateProduct.setCapacity(liquid.getCapacity());
        updateProduct.setQuantity(liquid.getQuantity());
        updateProduct.setPricePerLiter(liquid.getPricePerLiter());
        updateProduct.setLiquidCategory(liquid.getLiquidCategory());
        updateProduct.setDescription(liquid.getDescription());


        return elementLiquidRepo.save(updateProduct);
    }
}
