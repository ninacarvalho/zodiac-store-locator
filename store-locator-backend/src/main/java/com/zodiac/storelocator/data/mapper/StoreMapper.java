package com.zodiac.storelocator.data.mapper;

import com.zodiac.storelocator.data.dto.StoreDto;
import com.zodiac.storelocator.data.entity.Store;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StoreMapper {
    StoreDto toDto(Store store);
    Store toEntity(StoreDto storeDto);
}