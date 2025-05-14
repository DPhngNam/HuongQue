package com.huongque.orderservice.model;

import java.util.Objects;

/**
 * Value Object representing a physical address in the system.
 * Immutable and thread-safe.
 */
public final class Address {
    private final String street;
    private final String city;
    private final String state;
    private final String zipCode;
    private final String country;
    
    private Address(Builder builder) {
        this.street = builder.street;
        this.city = builder.city;
        this.state = builder.state;
        this.zipCode = builder.zipCode;
        this.country = builder.country;
    }
    
    public String getStreet() {
        return street;
    }
    
    public String getCity() {
        return city;
    }
    
    public String getState() {
        return state;
    }
    
    public String getZipCode() {
        return zipCode;
    }
    
    public String getCountry() {
        return country;
    }
    
    public String getFullAddress() {
        return String.format("%s, %s, %s %s, %s", 
                street, city, state, zipCode, country);
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return Objects.equals(street, address.street) &&
               Objects.equals(city, address.city) &&
               Objects.equals(state, address.state) &&
               Objects.equals(zipCode, address.zipCode) &&
               Objects.equals(country, address.country);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(street, city, state, zipCode, country);
    }
    
    @Override
    public String toString() {
        return getFullAddress();
    }
    
    // Builder Pattern for Address
    public static class Builder {
        private String street;
        private String city;
        private String state;
        private String zipCode;
        private String country;
        
        public Builder withStreet(String street) {
            this.street = street;
            return this;
        }
        
        public Builder withCity(String city) {
            this.city = city;
            return this;
        }
        
        public Builder withState(String state) {
            this.state = state;
            return this;
        }
        
        public Builder withZipCode(String zipCode) {
            this.zipCode = zipCode;
            return this;
        }
        
        public Builder withCountry(String country) {
            this.country = country;
            return this;
        }
        
        public Address build() {
            validate();
            return new Address(this);
        }
        
        private void validate() {
            if (street == null || street.trim().isEmpty()) {
                throw new IllegalStateException("Street cannot be empty");
            }
            if (city == null || city.trim().isEmpty()) {
                throw new IllegalStateException("City cannot be empty");
            }
            if (state == null || state.trim().isEmpty()) {
                throw new IllegalStateException("State cannot be empty");
            }
            if (zipCode == null || zipCode.trim().isEmpty()) {
                throw new IllegalStateException("Zip code cannot be empty");
            }
            if (country == null || country.trim().isEmpty()) {
                throw new IllegalStateException("Country cannot be empty");
            }
        }
    }
    
    // Factory method for common use case
    public static Address of(String street, String city, String state, String zipCode, String country) {
        return new Builder()
                .withStreet(street)
                .withCity(city)
                .withState(state)
                .withZipCode(zipCode)
                .withCountry(country)
                .build();
    }
}
