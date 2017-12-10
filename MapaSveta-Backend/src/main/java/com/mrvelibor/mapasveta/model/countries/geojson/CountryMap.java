package com.mrvelibor.mapasveta.model.countries.geojson;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;

public class CountryMap {
    @Id
    @JsonIgnore
    private String id;
    private String countryCode3;
    private CountryMapSize size;
    private String geoJson;

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

    public String getGeoJson() {
        return geoJson;
    }

    public void setGeoJson(String geoJson) {
        this.geoJson = geoJson;
    }
}
