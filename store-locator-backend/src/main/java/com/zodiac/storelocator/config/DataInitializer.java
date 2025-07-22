package com.zodiac.storelocator.config;

import com.github.javafaker.Faker;
import com.zodiac.storelocator.data.entity.Store;
import com.zodiac.storelocator.data.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Locale;
import java.util.Random;
import java.util.stream.IntStream;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final StoreRepository storeRepository;
    private final Faker faker = new Faker(new Locale("en-CA"));
    private final Random random = new Random();

    @Override
    public void run(String... args) {
        if (storeRepository.count() > 0) return;

        IntStream.range(0, 20).forEach(i -> {
            Store store = Store.builder()
                    .name(faker.company().name())
                    .rating(random.nextInt(5) + 1)
                    .description(faker.company().catchPhrase())
                    .latitude(43.6 + random.nextDouble() * 0.2)
                    .longitude(-79.6 + random.nextDouble() * 0.2)
                    .imageUrl("https://picsum.photos/seed/" + i + "/400/300")
                    .build();
            storeRepository.save(store);
        });

        System.out.println("✅ Inserted 20 fake stores.");
    }
}