package com.mrvelibor.mapasveta.model.countries;

import com.mrvelibor.mapasveta.model.common.enums.VisaRequirementEnum;

import javax.persistence.*;

@Entity
public class VisaRequirement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Country fromCountry;

    @ManyToOne
    private Country toCountry;

    private VisaRequirementEnum requirement;

    private String lengthOfStay;

    private String other;

    private String notes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Country getFromCountry() {
        return fromCountry;
    }

    public void setFromCountry(Country fromCountry) {
        this.fromCountry = fromCountry;
    }

    public Country getToCountry() {
        return toCountry;
    }

    public void setToCountry(Country toCountry) {
        this.toCountry = toCountry;
    }

    public VisaRequirementEnum getRequirement() {
        return requirement;
    }

    public void setRequirement(VisaRequirementEnum requirement) {
        this.requirement = requirement;
    }

    public String getLengthOfStay() {
        return lengthOfStay;
    }

    public void setLengthOfStay(String lengthOfStay) {
        this.lengthOfStay = lengthOfStay;
    }

    public String getOther() {
        return other;
    }

    public void setOther(String other) {
        this.other = other;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
