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

    private Integer lengthOfStay;

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

    public Integer getLengthOfStay() {
        return lengthOfStay;
    }

    public void setLengthOfStay(Integer lengthOfStay) {
        this.lengthOfStay = lengthOfStay;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
