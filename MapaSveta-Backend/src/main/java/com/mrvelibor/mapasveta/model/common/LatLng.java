package com.mrvelibor.mapasveta.model.common;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.Digits;
import java.math.BigDecimal;

@Embeddable
@Access(AccessType.FIELD)
public class LatLng {
    @Column(precision = 10, scale = 7)
    @Digits(integer = 3, fraction = 7)
    private BigDecimal lat;

    @Column(precision = 10, scale = 7)
    @Digits(integer = 3, fraction = 7)
    private BigDecimal lng;

    public LatLng() {
    }

    public LatLng(BigDecimal lat, BigDecimal lng) {
        this.lat = lat;
        this.lng = lng;
    }

    public BigDecimal getLat() {
        return lat;
    }

    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }

    public BigDecimal getLng() {
        return lng;
    }

    public void setLng(BigDecimal lng) {
        this.lng = lng;
    }
}
