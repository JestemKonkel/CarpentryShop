package com.project.carpentryshop.Repo.OrderRepo.AssignmentsRepo.ItemsRepo;

import com.project.carpentryshop.entity.Order.Items.Items;
import com.project.carpentryshop.entity.Products.ElementConstant;
import com.project.carpentryshop.entity.Products.ElementLiquid;
import com.project.carpentryshop.entity.Order.Items.ItemList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemListRepository extends CrudRepository<ItemList, Long> {

    boolean existsByElementConstantAndItems(ElementConstant exist, Items a);

    ItemList findByElementConstant_IdAndItems(Long id, Items lastItems);

    boolean existsByElementLiquidAndItems(ElementLiquid exist, Items a );

    ItemList findByElementLiquid_IdAndItems(Long id, Items lastItems);

    ItemList findTopByOrderByItemsDesc();

    List<ItemList> findByItems(Items items);
}
