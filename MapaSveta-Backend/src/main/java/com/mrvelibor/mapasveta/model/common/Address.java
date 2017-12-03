package com.mrvelibor.mapasveta.model.common;

import com.mrvelibor.mapasveta.model.countries.City;
import com.mrvelibor.mapasveta.model.countries.Country;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

@Embeddable
@Access(AccessType.FIELD)
public class Address {
    private String street;

    private String zipCode;

    private String cityName;

    @ManyToOne
    private City city;

    @ManyToOne
    private Country country;

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipCode() {
        if (zipCode == null || zipCode.isEmpty()) {
            if (city != null) {
                return city.getZipCode();
            }
        }
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCityName() {
        if (cityName == null || cityName.isEmpty()) {
            if (city != null) {
                return city.getName();
            }
        }
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}
