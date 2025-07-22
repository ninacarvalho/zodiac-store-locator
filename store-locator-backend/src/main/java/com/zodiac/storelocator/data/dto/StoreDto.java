package com.zodiac.storelocator.data.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class StoreDto {
    Long id;

    @NotBlank
    String name;

    @Min(1) @Max(5)
    Integer rating;

    @NotBlank
    String description;

    @NotNull
    Double latitude;

    @NotNull
    Double longitude;

    @NotBlank
    String imageUrl;
}