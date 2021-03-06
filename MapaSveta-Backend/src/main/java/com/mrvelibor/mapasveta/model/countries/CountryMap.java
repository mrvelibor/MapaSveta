package com.mrvelibor.mapasveta.model.countries;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mrvelibor.mapasveta.model.common.enums.CountryMapSize;
import org.springframework.data.annotation.Id;

import java.util.Map;

public class CountryMap {
    @Id
    @JsonIgnore
    private String id;
    private String countryCode3;
    private CountryMapSize size;
    private Map<String, Object> geoJson;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCountryCode3() {
        return countryCode3;
    }

    public void setCountryCode3(String countryCode3) {
        this.countryCode3 = countryCode3;
    }

    public CountryMapSize getSize() {
        return size;
    }

    public void setSize(CountryMapSize size) {
        this.size = size;
    }

    public Map<String, Object> getGeoJson() {
        return geoJson;
    }

    public void setGeoJson(Map<String, Object> geoJson) {
        this.geoJson = geoJson;
    }
}
