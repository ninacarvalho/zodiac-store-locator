package com.zodiac.storelocator.exception;

public class StoreNotFoundException extends RuntimeException {
    public StoreNotFoundException(Long id) {
        super("Store with ID " + id + " not found.");
    }
}