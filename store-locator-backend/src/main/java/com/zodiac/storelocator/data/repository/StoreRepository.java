package com.zodiac.storelocator.data.repository;
import com.zodiac.storelocator.data.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
}
